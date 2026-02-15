namespace TripPlanningService.Application.CQRS.QueriesHandlers.TripQueriesHandlers
{
    public class GetTripsByOwnerIdQueryHandler(IApplicationDbContext dbContext) : IQueryHandler<GetTripsByOwnerIdQuery, List<GetTripDetailsDTO>>
    {
        public async Task<List<GetTripDetailsDTO>> Handle(GetTripsByOwnerIdQuery request, CancellationToken cancellationToken)
        {
            var ownerId = TripOwnerId.Of(request.ownerId);
            var trips = await dbContext.Trips.Where(t => t.OwnerId == ownerId).ToListAsync();
            var tripsDetails = new List<GetTripDetailsDTO>();
            foreach (var trip in trips)
            {
                var tripDetails = Mapper.MaptripToGetTripDetailsGetTripDetailsDTO(trip);
                tripsDetails.Add(tripDetails);
            }
            return tripsDetails;
        }
    }
}