using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.Commands.TripCommands
{
    public record PublishTripCommand(PublishTripDTO PublishTripDTO) : ICommand<bool>
    {
    }
}
