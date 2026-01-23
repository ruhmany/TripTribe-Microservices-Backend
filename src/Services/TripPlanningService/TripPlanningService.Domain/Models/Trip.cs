namespace TripPlanningService.Domain.Models
{
    public class Trip : Aggregate<TripId>
    {
        public Guid OwnerId { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public TripVisibility Visibility { get; private set; }
        public TripStatus Status { get; private set; }
        public DateRange DateRange { get; private set; }

        private readonly List<ItineraryDay> _days = new();
        private readonly List<TripCollaborator> _collaborators = new();

        public IReadOnlyCollection<ItineraryDay> Days => _days;
        public IReadOnlyCollection<TripCollaborator> Collaborators => _collaborators;

        public static Trip Create(TripId tripId, Guid ownerId, string title,
            string description, TripVisibility visibility, TripStatus status, DateRange dateRange)
        {
            if (ownerId == Guid.Empty)
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
            };
            trip.AddDomainEvent(new TripCreatedEvent(trip));
            return trip;
        }

        public void UpdateDetails(string title, string description)
        {
            if (Status == TripStatus.Published)
                throw new DomainException("Cannot edit a published trip");
            if (string.IsNullOrWhiteSpace(title))
                throw new DomainException("Trip title is required");

            Title = title;
            Description = description ?? string.Empty;
            AddDomainEvent(new TripUpdatedEvent(Id, title, description));
        }

        public void ChangeDateRange(DateRange newRange)
        {
            if (Status == TripStatus.Published)
                throw new DomainException("Cannot change dates of a published trip");
            if (newRange == null)
                throw new DomainException("Date range is required");

            DateRange = newRange;
            AddDomainEvent(new TripDateChangedEvent(Id, newRange.Start, newRange.End));
        }

        public void Publish()
        {
            if (!_days.Any())
                throw new DomainException("Trip must have at least one day before publishing");

            Status = TripStatus.Published;
            AddDomainEvent(new TripPublishedEvent(Id));
        }
    }
}
