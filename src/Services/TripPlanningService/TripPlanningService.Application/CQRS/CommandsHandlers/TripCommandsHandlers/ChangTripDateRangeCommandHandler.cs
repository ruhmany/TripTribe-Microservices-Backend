using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Domain.Exceptions;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCommandsHandlers
{
    public class ChangTripDateRangeCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<ChangTripDateRangeCommand, ChangeTripDateRangeResult>
    {
        public async Task<ChangeTripDateRangeResult> Handle(ChangTripDateRangeCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.DateRange.TripId);
            var trip = await dbContext.Trips.FindAsync(tripId);
            if (trip == null) throw new DomainException("Trip not found");   
            var ownerId = TripOwnerId.Of(request.DateRange.ownerId);
            if (trip.OwnerId != ownerId) throw new DomainException("You are not authrized to modify on any property of this trip");
            var dateRange = new DateRange(request.DateRange.StartAt, request.DateRange.EndAt);
            trip.ChangeDateRange(dateRange);
            await dbContext.SaveChangesAsync(cancellationToken);
            return new ChangeTripDateRangeResult(trip.Id.Value, trip.Title, trip.DateRange.Start, trip.DateRange.End);
        }


    }
}
