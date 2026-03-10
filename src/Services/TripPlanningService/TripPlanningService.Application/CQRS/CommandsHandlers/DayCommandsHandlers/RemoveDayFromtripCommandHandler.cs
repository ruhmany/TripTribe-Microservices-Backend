
namespace TripPlanningService.Application.CQRS.CommandsHandlers.DayCommandsHandlers
{
    public class RemoveDayFromtripCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<RemoveDayFromTripCommand, RemoveDayFromTripResult>
    {
        public async Task<RemoveDayFromTripResult> Handle(RemoveDayFromTripCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.RemoveDayFromTripDTO.tripId);
            var trip = await dbContext.Trips.FindAsync(tripId);
            if (trip == null)
                throw new KeyNotFoundException("Trip not found");
            var ownerId = TripOwnerId.Of(request.RemoveDayFromTripDTO.ownerId);
            var dayId = ItineraryDayId.Of(request.RemoveDayFromTripDTO.dayId);
            var day = trip.RemoveDay(dayId, ownerId);
            dbContext.ItineraryDays.Remove(day);
            await dbContext.SaveChangesAsync(cancellationToken);
            return new RemoveDayFromTripResult(trip.Id.Value, day.Id.Value);
        }
    }
}
