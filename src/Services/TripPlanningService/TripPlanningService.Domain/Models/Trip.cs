namespace TripPlanningService.Domain.Models
{
    public class Trip : Aggregate<TripId>
    {
        public TripOwnerId OwnerId { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public TripVisibility Visibility { get; private set; }
        public TripStatus Status { get; private set; }
        public DateRange DateRange { get; private set; }

        private readonly List<ItineraryDay> _days = new();
        private readonly List<TripCollaborator> _collaborators = new();

        public IReadOnlyCollection<ItineraryDay> Days => _days;
        public IReadOnlyCollection<TripCollaborator> Collaborators => _collaborators;

        #region Trip Functions
        public static Trip Create(TripId tripId, TripOwnerId ownerId, string createBy, string title,
            string description, TripVisibility visibility, TripStatus status, DateRange dateRange)
        {
            if (ownerId == null)
                throw new DomainException("Owner is required");
            if (string.IsNullOrWhiteSpace(title))
                throw new DomainException("Trip title is required");
            if (dateRange == null)
                throw new DomainException("Date range is required");

            var trip = new Trip
            {
                Id = tripId,
                OwnerId = ownerId,
                Title = title,
                Description = description ?? string.Empty,
                Visibility = visibility,
                Status = status,
                DateRange = dateRange,
                CreatedBy = createBy,
                LastModifiedBy = createBy,
            };
            trip.AddDomainEvent(new TripCreatedEvent(trip));
            return trip;
        }

        public void UpdateDetails(string title, string description, TripOwnerId tripOwnerId)
        {
            EnsureOwnership(tripOwnerId);

            if (Status == TripStatus.Published)
                throw new DomainException("Cannot edit a published trip");
            if (string.IsNullOrWhiteSpace(title))
                throw new DomainException("Trip title is required");

            Title = title;
            Description = description ?? string.Empty;
            AddDomainEvent(new TripUpdatedEvent(Id, title, description));
        }

        public void ChangeDateRange(DateRange newRange, TripOwnerId ownerId)
        {
            EnsureOwnership(ownerId);

            if (Status == TripStatus.Published)
                throw new DomainException("Cannot change dates of a published trip");
            if (newRange == null)
                throw new DomainException("Date range is required");
            if (newRange.TotalDays < 0)
                throw new DomainException("The range is not valid");

            DateRange = newRange;
            AddDomainEvent(new TripDateChangedEvent(Id, newRange.Start, newRange.End));
        }

        public void Publish(TripOwnerId tripOwnerId)
        {
            EnsureOwnership(tripOwnerId);
            if (!_days.Any())
                throw new DomainException("Trip must have at least one day before publishing");

            Status = TripStatus.Published;
            AddDomainEvent(new TripPublishedEvent(Id));
        }

        public void ChangeVisibility(TripOwnerId tripOwnerId, TripVisibility visibility)
        {
            EnsureOwnership(tripOwnerId);
            if (Status == TripStatus.Published && visibility == TripVisibility.VisableToOnlyMe)
                throw new DomainException("Published trips cannot be made private");


            Visibility = visibility;
            AddDomainEvent(new VisibilityChangedEvent(Id, visibility));
        }
        #endregion

        #region ItineraryDay Functions
        public void AddDay(DateOnly date, TripOwnerId ownerId)
        {
            EnsureOwnership(ownerId);
            
            EnsureEditable();

            if (date < DateRange.Start || date > DateRange.End)
                throw new DomainException("Day must be within trip date range");

            if (_days.Any(d => d.Date == date))
                throw new DomainException("Day already exists");

            var day = ItineraryDay.Create(ItineraryDayId.Of(Guid.NewGuid()), date, Id);
            _days.Add(day);
            AddDomainEvent(new DayAddedEvent(Id, day.Id, date));
        }

        public ItineraryDay RemoveDay(ItineraryDayId dayId, TripOwnerId tripOwnerId)  // Changed from Guid
        {
            EnsureOwnership(tripOwnerId);

            EnsureEditable();

            var day = _days.FirstOrDefault(d => d.Id == dayId)
                ?? throw new DomainException("Day not found");

            if (day.Activities.Any())
                throw new DomainException("Cannot remove a day that contains activities");

            _days.Remove(day);
            AddDomainEvent(new DayRemovedEvent(Id, dayId));
            return day;
        }
        #endregion

        #region Activity Functions
        public void AddActivity(ItineraryDayId dayId, Activity activity)
        {
            EnsureEditable();

            if (activity == null)
                throw new ArgumentNullException(nameof(activity));

            var day = GetDay(dayId);
            day.AddActivity(activity);
            AddDomainEvent(new ActivityAddedEvent(Id, dayId, activity.Id));
        }

        public void UpdateActivity(ItineraryDayId dayId, ActivityId activityId, string title, string notes)  // Changed
        {
            EnsureEditable();

            var day = GetDay(dayId);
            day.UpdateActivity(activityId, title, notes);
            AddDomainEvent(new ActivityUpdatedEvent(Id, dayId, activityId));
        }

        //public void ReorderActivity(ItineraryDayId dayId, Guid activityId, int newPosition)  // Changed
        //{
        //    EnsureEditable();

        //    var day = GetDay(dayId);
        //    day.ReorderActivity(activityId, newPosition);
        //    AddDomainEvent(new ActivityReorderedEvent(Id, dayId, activityId, newPosition));
        //}

        public void RemoveActivity(ItineraryDayId dayId, ActivityId activityId)  // Changed
        {
            EnsureEditable();

            var day = GetDay(dayId);
            day.RemoveActivity(activityId);
            AddDomainEvent(new ActivityRemovedEvent(Id, dayId, activityId));
        }
        #endregion

        #region TripCollaborator Functions
        public void AddCollaborator(TripCollaboratorId userId, TripRole role)
        {
            EnsureEditable();

            if (userId.Value == OwnerId.Value)
                throw new DomainException("Owner cannot be added as a collaborator");

            if (_collaborators.Any(c => c.Id == userId))
                throw new DomainException("User is already a collaborator");

            var collaborator = TripCollaborator.Create(userId, role);
            _collaborators.Add(collaborator);
            AddDomainEvent(new CollaboratorAddedEvent(Id, userId, role));
        }

        public void RemoveCollaborator(TripCollaboratorId userId)
        {
            EnsureEditable();

            var collab = _collaborators.FirstOrDefault(c => c.Id == userId)
                ?? throw new DomainException("Collaborator not found");

            _collaborators.Remove(collab);
            AddDomainEvent(new CollaboratorRemovedEvent(Id, userId));
        }

        public void ChangeCollaboratorRole(TripCollaboratorId userId, TripRole newRole)
        {
            EnsureEditable();

            var collab = _collaborators.FirstOrDefault(c => c.Id == userId)
                ?? throw new DomainException("Collaborator not found");

            collab.ChangeRole(newRole);
            AddDomainEvent(new CollaboratorRoleChangedEvent(Id, userId, newRole));
        }
        #endregion

        #region Helper Functions
        private ItineraryDay GetDay(ItineraryDayId dayId)
        {
            return _days.FirstOrDefault(d => d.Id == dayId)
                ?? throw new DomainException("Day not found");
        }

        private void EnsureEditable()
        {
            if (Status == TripStatus.Published)
                throw new DomainException("Published trip cannot be modified");
        }

        private void EnsureOwnership(TripOwnerId ownerId)
        {
            if (OwnerId != ownerId)
                throw new DomainException("Only the trip owner can perform this action");
        }
        #endregion
    }
}
