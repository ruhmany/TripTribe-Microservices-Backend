using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.DTOs
{
    public record PublishTripDTO(Guid ownerId, Guid tripId);
}
