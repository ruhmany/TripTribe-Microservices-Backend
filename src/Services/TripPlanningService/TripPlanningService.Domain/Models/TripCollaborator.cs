namespace TripPlanningService.Domain.Models
{
    public class TripCollaborator : Entity<TripCollaboratorId>
    {
        public TripRole Role { get; private set; }

        private List<Trip> trips = new();

        public IReadOnlyCollection<Trip> Trips { get; private set; }

        public void ChangeRole(TripRole newRole)
        {
            Role = newRole;
        }

        public static TripCollaborator Create(TripCollaboratorId tripCollaboratorId, TripRole role)
        {
            var tripCollaborator = new TripCollaborator
            {
                Id = tripCollaboratorId,
                Role = role
            };
            return tripCollaborator;
        }
    }
}
