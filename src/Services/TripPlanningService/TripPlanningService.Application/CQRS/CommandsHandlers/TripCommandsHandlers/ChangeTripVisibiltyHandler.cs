using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCommandsHandlers
{
    public class ChangeTripVisibiltyHandler(IApplicationDbContext dbContext) : ICommandHandler<ChangeTripVisibilityCommand, ChangeTripVisibilityResult>
    {
        public async Task<ChangeTripVisibilityResult> Handle(ChangeTripVisibilityCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.changeTripVisibilty.tripId);
            var trip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip == null) throw new KeyNotFoundException("Trip not found"); 
            var ownerId = TripOwnerId.Of(request.changeTripVisibilty.ownerId);
            trip.ChangeVisibility(ownerId, request.changeTripVisibilty.Visibility); 
            await dbContext.SaveChangesAsync(cancellationToken); return new ChangeTripVisibilityResult(trip.Id.Value, trip.Visibility);
            return new ChangeTripVisibilityResult(trip.Id.Value, trip.Visibility);
        }
    }
}
