namespace TripPlanningService.Domain.Events
{
    public record CollaboratorRoleChangedEvent(TripId TripId, TripCollaboratorId TripCollaboratorId, TripRole TripRole) : IDomainEvent;
}
