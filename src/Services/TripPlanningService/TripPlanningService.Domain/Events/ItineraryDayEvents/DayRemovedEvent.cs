namespace TripPlanningService.Domain.Events
{
    public record class DayRemovedEvent(TripId TripId, ItineraryDayId ItineraryDayId) : IDomainEvent;
}
