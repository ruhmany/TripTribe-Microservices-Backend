using TripPlanningService.Domain.ValueObjects;

namespace TripPlanningService.Domain.Models
{
    public class ItineraryDay : Entity<ItineraryDayId>
    {
        public DateOnly Date { get; private set; }

        private readonly List<Activity> _activities = new();
        public IReadOnlyCollection<Activity> Activities => _activities;
        public TripId TripId { get; private set; } 

        public static ItineraryDay Create(ItineraryDayId id, DateOnly date, TripId tripId)
        {
            var itineraryDay = new ItineraryDay
            {
                Id = id,
                TripId = tripId,
                Date = date
            };
            return itineraryDay;
        }

        public void AddActivity(Activity activity)
        {
            _activities.Add(activity);
        }

        public void UpdateActivity(ActivityId activityId, string title, string notes)
        {
            var activity = GetActivityById(activityId);
            if (activity != null)
                throw new DomainException("No Activity With This Id");
            activity.UpdateActivity(title, notes);
        }

        public void RemoveActivity(ActivityId activityid)
        {
            var activity = GetActivityById(activityid);
            if (activity != null)
                throw new DomainException("No Activity With This Id");
            _activities.Remove(activity);
        }

        private Activity GetActivityById(ActivityId id)
        {
            var activity = _activities.FirstOrDefault(x => x.Id.Value == id.Value);
            return activity;
        }
    }
}
