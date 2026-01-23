namespace TripPlanningService.Domain.Models
{
    public class Activity
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Notes { get; private set; }
        public TimeOnly? StartTime { get; private set; }
        public TimeOnly? EndTime { get; private set; }
        public Location Location { get; private set; }
        public ActivityType Type { get; private set; }
        public Money? EstimatedCost { get; private set; }
    }
}
