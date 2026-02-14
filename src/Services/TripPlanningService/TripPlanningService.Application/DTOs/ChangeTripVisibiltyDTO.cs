using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Domain.Enums;

namespace TripPlanningService.Application.DTOs
{
    public record ChangeTripVisibiltyDTO(Guid tripId, Guid ownerId, TripVisibility Visibility);  
}
