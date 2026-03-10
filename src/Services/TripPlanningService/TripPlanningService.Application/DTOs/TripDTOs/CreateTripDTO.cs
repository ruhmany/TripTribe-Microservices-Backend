using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Domain.Enums;

namespace TripPlanningService.Application.DTOs.TripDTOs
{
    public record CreateTripDTO(Guid ownerId, string createdBy, string title,
            string description, TripVisibility visibility, TripStatus status, DateOnly Start, DateOnly End);
}
