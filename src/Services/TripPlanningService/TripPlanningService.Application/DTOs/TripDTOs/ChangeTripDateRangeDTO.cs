using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs.TripDTOs
{
    public record ChangeTripDateRangeDTO(Guid TripId, Guid ownerId,DateOnly StartAt, DateOnly EndAt);
}
