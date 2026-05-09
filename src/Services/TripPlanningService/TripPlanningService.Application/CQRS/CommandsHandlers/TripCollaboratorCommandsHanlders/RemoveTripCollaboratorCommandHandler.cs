using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCollaboratorCommandsHanlders
{
    public class RemoveTripCollaboratorCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<RemoveCollaboratorCommand, bool>
    {
        public async Task<bool> Handle(RemoveCollaboratorCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.tripdId);
            var trip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip != null)
            {
                var ownerId = TripOwnerId.Of(request.tripOwnerId);
                var collaboratorId = TripCollaboratorId.Of(request.collaboratorId);
                trip.RemoveCollaborator(collaboratorId, ownerId);
                return await dbContext.SaveChangesAsync(cancellationToken) > 0;
            }
            return false;
        }
    }
}
