
using Microsoft.AspNetCore.Mvc;
using TripPlanningService.Application.DTOs.TripDTOs;

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
                return Results.Ok(ApiResponse<List<GetTripDetailsDTO>>.Success(result, "User trips retrieved successfully."));
            });
        }
    }
}
