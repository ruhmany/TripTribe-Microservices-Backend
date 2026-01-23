namespace TripPlanningService.Domain.Models
{
    public class ItineraryDay : Entity<ItineraryDayId>
    {
        public Guid Id { get; private set; }
        public DateOnly Date { get; private set; }

        private readonly List<Activity> _activities = new();
        public IReadOnlyCollection<Activity> Activities => _activities;
    }
}
