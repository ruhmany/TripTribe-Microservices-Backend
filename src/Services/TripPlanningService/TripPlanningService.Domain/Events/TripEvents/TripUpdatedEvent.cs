namespace TripPlanningService.Domain.Events
{
    public record TripUpdatedEvent(TripId TripId, string title, string description) : IDomainEvent;
}
