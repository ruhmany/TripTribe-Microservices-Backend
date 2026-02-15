
using Microsoft.AspNetCore.Mvc;

namespace TripPlanningService.Api.Endpoints.TripEndpoints
{
    public class GetUserTripsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/Trips/UserTrips", async ([FromQuery] Guid userId, ISender sender) =>
            {
                var command = new GetTripsByOwnerIdQuery(userId);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
