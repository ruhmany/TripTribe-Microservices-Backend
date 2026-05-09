using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands
{
    public record AddTripCollaboratorCommand(Guid tripdId, Guid collaboratorId, TripRole collaboratorRole) : ICommand<bool>
    {
    }
}
