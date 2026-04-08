using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.Commands.ActivityCommands
{
    public record RemoveActivityFromDayCommand(Guid tripId, Guid dayId, Guid activityId, Guid ownerId) : ICommand<bool>
    {
    }
}
