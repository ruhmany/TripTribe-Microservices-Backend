using TripPlanningService.Domain.ValueObjects;

namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCommandsHandlers
{
    public class UpdateTripCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateTripDetailsCommand, UpdateTripResult>
    {
        public async Task<UpdateTripResult> Handle(UpdateTripDetailsCommand request, CancellationToken cancellationToken)
        {
            var tripdId = TripId.Of(request.TripUpdateDetailsDTO.tripId);
            var trip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == tripdId);
            if (trip == null) throw new KeyNotFoundException("Trip not found");
            trip.UpdateDetails(request.TripUpdateDetailsDTO.title, request.TripUpdateDetailsDTO.description);
            await dbContext.SaveChangesAsync(cancellationToken);
            return new UpdateTripResult(trip.Id.Value, title: trip.Title, details: trip.Description);
        }
    }
}