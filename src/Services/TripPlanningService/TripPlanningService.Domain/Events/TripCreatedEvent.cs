namespace TripPlanningService.Domain.Events
{
    public record TripCreatedEvent(Trip Trip) : IDomainEvent;
}
