namespace TripPlanningService.Application.CQRS.Queries.TripQueries
{
    public record GetTripsByOwnerIdQuery(Guid ownerId) : IQuery<List<GetTripDetailsDTO>>
    {

    }
}
