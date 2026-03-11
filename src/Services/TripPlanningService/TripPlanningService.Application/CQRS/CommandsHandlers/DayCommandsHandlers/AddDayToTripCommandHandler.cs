namespace TripPlanningService.Application.CQRS.CommandsHandlers.DayCommandsHandlers
{
    public class AddDayToTripCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<AddDayToTripCommand, AddDayToTripResult>
    {
        public async Task<AddDayToTripResult> Handle(AddDayToTripCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.AddDayToTripDTO.tripId);
            var trip = await dbContext.Trips.FindAsync(tripId);
            if (trip == null)
                throw new KeyNotFoundException("Trip not found");
            var ownerId = TripOwnerId.Of(request.AddDayToTripDTO.ownerId);
            trip.AddDay(request.AddDayToTripDTO.Date, ownerId);
            await dbContext.SaveChangesAsync(cancellationToken);
            return new AddDayToTripResult(trip.Days.Last().Id.Value, trip.Id.Value, request.AddDayToTripDTO.Date);
        }
    }
}
