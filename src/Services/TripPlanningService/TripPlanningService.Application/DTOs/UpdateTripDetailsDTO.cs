using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs
{
    public record UpdateTripDetailsDTO(Guid tripId,string title, string description);
}
