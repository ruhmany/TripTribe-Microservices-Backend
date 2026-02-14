using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCommandsHandlers
{
    public class PublishTripCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<PublishTripCommand, bool>
    {
        public async Task<bool> Handle(PublishTripCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.PublishTripDTO.tripId);
            var onwrId = TripOwnerId.Of(request.PublishTripDTO.ownerId);
            var trip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip == null)
            {
                return false;
            }
            trip.Publish(onwrId);
            return await dbContext.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
