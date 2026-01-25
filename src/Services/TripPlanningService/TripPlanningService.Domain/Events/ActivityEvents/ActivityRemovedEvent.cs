namespace TripPlanningService.Domain.Events
{
    public record ActivityRemovedEvent(TripId TripId, ItineraryDayId ItineraryDayId, ActivityId ActivityId) : IDomainEvent
    {
    }
}
