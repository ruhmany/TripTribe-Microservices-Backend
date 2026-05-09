using System.Runtime.InteropServices;

namespace TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands
{
    public record RemoveCollaboratorCommand(Guid tripOwnerId, Guid tripdId, Guid collaboratorId) : ICommand<bool>
    {
    }
}
