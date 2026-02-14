namespace TripPlanningService.Application.CQRS.CommandsHandlers.TripCommandsHandlers
{
    public class CreateTripCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateTripCommand, CreateTripResult>
    {
        public async Task<CreateTripResult> Handle(CreateTripCommand request, CancellationToken cancellationToken)
        {
            var trip = CreateTrip(request, cancellationToken);
            dbContext.Trips.Add(trip);
            await dbContext.SaveChangesAsync(cancellationToken);
            return new CreateTripResult(trip.Id.Value);
        }

        private Trip CreateTrip(CreateTripCommand request, CancellationToken cancellationToken)
        {
            var dateRage = new DateRange(request.CreateTripDTO.Start, request.CreateTripDTO.End);
            var ownerId = TripOwnerId.Of(request.CreateTripDTO.ownerId);
            var trip = Trip.Create(tripId: TripId.Of(Guid.NewGuid()),
                ownerId: ownerId, createBy: request.CreateTripDTO.createdBy,
                request.CreateTripDTO.title,
                description: request.CreateTripDTO.description,
                visibility: request.CreateTripDTO.visibility,
                status: request.CreateTripDTO.status, dateRage);

            return trip;
        }
    }
}
