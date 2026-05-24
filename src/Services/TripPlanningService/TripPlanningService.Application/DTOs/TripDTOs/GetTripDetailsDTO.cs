using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs.TripDTOs
{
    public record GetTripDetailsDTO(string tripId, string owerId, string title, string details, DateOnly startDate, DateOnly endDate, int status, int visibility, List<TripDayDetails> DayDetails);
    public record TripDayDetails(string dayId, DateOnly date, List<TripActivityDetails> activities);
    public record TripActivityDetails(string activityId, string title, string description, decimal money, int type, string location, TimeOnly startTime, TimeOnly endTime);
}
