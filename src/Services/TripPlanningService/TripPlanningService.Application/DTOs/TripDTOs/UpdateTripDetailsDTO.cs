using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs.TripDTOs
{
    public record UpdateTripDetailsDTO(Guid tripId, Guid ownerId, string title, string description);
}
