using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.ActivityCommandsHandlers
{
    public class RemoveActivityFromDayCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<RemoveActivityFromDayCommand, bool>
    {
        public async Task<bool> Handle(RemoveActivityFromDayCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.tripId);
            var trip = dbContext.Trips.Include(t => t.Days).ThenInclude(d => d.Activities).FirstOrDefault(t => t.Id == tripId);
            var dayId = ItineraryDayId.Of(request.dayId);
            var ownerId = TripOwnerId.Of(request.ownerId);
            var activityId = ActivityId.Of(request.activityId);

            trip.RemoveActivity(dayId, activityId, ownerId);

            return await dbContext.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
