namespace TripPlanningService.Domain.Events
{
    public record ActivityUpdatedEvent(TripId TripId, ItineraryDayId ItineraryDayId, ActivityId ActivityId) : IDomainEvent
    {
    }
}
