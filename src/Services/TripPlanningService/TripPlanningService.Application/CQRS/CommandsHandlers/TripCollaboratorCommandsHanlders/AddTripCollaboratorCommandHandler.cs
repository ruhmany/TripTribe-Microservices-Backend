using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCollaboratorCommandsHanlders
{
    public record AddTripCollaboratorCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<AddTripCollaboratorCommand, bool>
    {        
        public async Task<bool> Handle(AddTripCollaboratorCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.tripdId);

            var trip = dbContext.Trips.FirstOrDefault(t => t.Id == tripId);

            var collaboratorId = TripCollaboratorId.Of(request.collaboratorId);

            trip.AddCollaborator(collaboratorId, request.collaboratorRole);

            return await dbContext.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
