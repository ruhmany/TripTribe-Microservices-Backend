namespace TripPlanningService.Application.CQRS.QueriesHandlers.TripQueriesHandlers
{
    public class GetTripDetailsQueryHandler(IApplicationDbContext dbContext) : IQueryHandler<GetTripDetailsQuery, GetTripDetailsDTO>
    {
        public async Task<GetTripDetailsDTO> Handle(GetTripDetailsQuery request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.tripId);
            var trip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip == null)
                throw new KeyNotFoundException("Trip not found");
            return Mapper.MaptripToGetTripDetailsGetTripDetailsDTO(trip);
        }
    }
}
