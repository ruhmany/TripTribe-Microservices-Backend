using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.Commands.ActivityCommands
{
    public record UpdateActivityCommand(AddEditActivityToDayDTO EditActivityDTO) : ICommand<bool>
    {

    }
}
