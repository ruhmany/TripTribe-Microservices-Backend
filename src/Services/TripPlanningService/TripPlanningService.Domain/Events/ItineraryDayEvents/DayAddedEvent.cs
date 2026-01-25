namespace TripPlanningService.Domain.Events
{
    public record DayAddedEvent(TripId TripId, ItineraryDayId ItineraryDayId, DateOnly Date) : IDomainEvent;
}
