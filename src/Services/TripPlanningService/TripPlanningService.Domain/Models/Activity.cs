namespace TripPlanningService.Domain.Models
{
    public class Activity : Entity<ActivityId>
    {
        public string Title { get; private set; }
        public string Notes { get; private set; }
        public TimeOnly? StartTime { get; private set; }
        public TimeOnly? EndTime { get; private set; }
        public Location Location { get; private set; }
        public ActivityType Type { get; private set; }
        public Money? EstimatedCost { get; private set; }

        private Activity(string title, string notes, TimeOnly startTime, TimeOnly endTime, Location location, ActivityType activityType, Money estimatedCost)
        {
            Title = title;
            Notes = notes;
            StartTime = startTime;
            EndTime = endTime;
            Location = location;
            Type = activityType;
            EstimatedCost = estimatedCost;
        }

        public static Activity Create(string title, string notes, TimeOnly startTime, TimeOnly endTime, Location location, ActivityType activityType, Money estimatedCost)
        {
            ModelValidations(title, notes);
            return new Activity(title, notes, startTime, endTime, location, activityType, estimatedCost);
        }

        public void UpdateActivity(string title, string notes)
        {
            ModelValidations(title, notes);
            Title = title;
            Notes = notes;
        }

        private static void ModelValidations(string title, string notes)
        {
            if (string.IsNullOrEmpty(title)) throw new ArgumentNullException("Title Mustn't Be Null");
            if (string.IsNullOrEmpty(notes)) throw new ArgumentNullException("Note's Mustn't Be Null");
        }
    }
}
