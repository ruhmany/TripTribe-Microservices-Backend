namespace TripPlanningService.Application.DTOs.ActivityDTOs
{
    public record AddActivityToDayDTO(Guid TripId, Guid DayId, Guid OwnerId, string Title, string Notes, TimeOnly StartTime, 
        TimeOnly EndTime, string LocationName, double Longitude, double Latitude, ActivityType ActivityType, decimal Amount, string Currency);
}
