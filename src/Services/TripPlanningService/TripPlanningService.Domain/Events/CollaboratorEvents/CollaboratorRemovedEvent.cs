namespace TripPlanningService.Domain.Events
{
    public record CollaboratorRemovedEvent(TripId TripId, TripCollaboratorId TripCollaboratorId) : IDomainEvent;
}
