using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Domain.Events
{
    public record TripUpdatedEvent(TripId, string title, string description) : IDomainEvent;
}
