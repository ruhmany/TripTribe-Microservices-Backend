namespace TripPlanningService.Application.DTOs.TripDayDTOs
{
    public record RemoveDayFromTripDTO(Guid tripId, Guid dayId, Guid ownerId);
}
