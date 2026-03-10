using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs.TripDayDTOs
{
    public record AddDayToTripDTO(Guid tripId, Guid ownerId, DateOnly Date);
}
