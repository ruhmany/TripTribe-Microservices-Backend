namespace TripPlanningService.Application.DTOs.ActivityDTOs
{
    public record AddEditActivityToDayDTO(Guid TripId, Guid DayId, Guid OwnerId, Guid? activityId,string Title, string Notes, TimeOnly StartTime, 
        TimeOnly EndTime, string LocationName, double Longitude, double Latitude, ActivityType ActivityType, decimal Amount, string Currency);
}
