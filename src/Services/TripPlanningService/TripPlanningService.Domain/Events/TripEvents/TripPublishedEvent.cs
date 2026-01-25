namespace TripPlanningService.Domain.Events
{
    public record TripPublishedEvent(TripId Id) : IDomainEvent;
}
