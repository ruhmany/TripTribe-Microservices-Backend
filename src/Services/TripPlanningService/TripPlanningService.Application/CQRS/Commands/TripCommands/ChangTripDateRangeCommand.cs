using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Application.DTOs.TripDTOs;

namespace TripPlanningService.Application.CQRS.Commands.TripCommands
{    
    public record ChangeTripDateRangeResult(Guid TripId, string TripTitle, DateOnly Start, DateOnly End);
    public record ChangTripDateRangeCommand(ChangeTripDateRangeDTO DateRange) : ICommand<ChangeTripDateRangeResult>
    {

    }
}
