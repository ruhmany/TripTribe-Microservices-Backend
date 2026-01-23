namespace TripPlanningService.Domain.Models
{
    public class TripCollaborator
    {
        public Guid UserId { get; private set; }
        public TripRole Role { get; private set; }
    }
}
