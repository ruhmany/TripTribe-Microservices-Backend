namespace TripPlanningService.Domain.Events
{
    public record TripDateChangedEvent(TripId id, DateOnly startDate, DateOnly endDate) : IDomainEvent;
}
