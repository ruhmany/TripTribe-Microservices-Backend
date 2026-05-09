namespace TripPlanningService.Domain.Events.CollaboratorEvents
{
    public record CollaboratorUnSubscripedEvent(TripId TripId, TripCollaboratorId CollaboratorId) : IDomainEvent;
}