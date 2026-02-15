using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs
{
    public record GetTripDetailsDTO(string tripId, string owerId, string title, string details, DateOnly startDate, DateOnly endDate, List<TripDayDetails> DayDetails);
    public record TripDayDetails(DateOnly date, List<TripActivityDetails> activities);
    public record TripActivityDetails(string title, string description, decimal money, string location, TimeOnly startTime, TimeOnly endTime);
}
