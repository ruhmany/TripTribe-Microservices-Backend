namespace TripPlanningService.Domain.Events
{
    public record CollaboratorAddedEvent(TripId TripId, TripCollaboratorId TripCollaboratorId, TripRole Role) : IDomainEvent;
}
