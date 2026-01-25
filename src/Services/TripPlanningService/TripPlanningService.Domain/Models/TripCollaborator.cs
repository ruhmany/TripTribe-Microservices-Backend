namespace TripPlanningService.Domain.Models
{
    public class TripCollaborator
    {
        public TripCollaboratorId UserId { get; private set; }
        public TripRole Role { get; private set; }

        public void ChangeRole(TripRole newRole)
        {
            Role = newRole;
        }

        public static TripCollaborator Create(TripCollaboratorId tripCollaboratorId, TripRole role)
        {
            var tripCollaborator = new TripCollaborator
            {
                UserId = tripCollaboratorId,
                Role = role
            };
            return tripCollaborator;
        }
    }
}
