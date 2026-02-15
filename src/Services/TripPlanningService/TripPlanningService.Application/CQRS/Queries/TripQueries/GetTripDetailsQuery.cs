namespace TripPlanningService.Application.CQRS.Queries.TripQueries
{
    public record GetTripDetailsQuery(Guid tripId) : IQuery<GetTripDetailsDTO>
    {
    }
}
