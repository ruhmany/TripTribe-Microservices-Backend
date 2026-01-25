namespace TripPlanningService.Domain.Events
{
    public record VisibilityChangedEvent(TripId TripId, TripVisibility Visibility) : IDomainEvent;
}
