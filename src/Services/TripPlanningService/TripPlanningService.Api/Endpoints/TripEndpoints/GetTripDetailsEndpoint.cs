using Microsoft.AspNetCore.Mvc;
using TripPlanningService.Application.DTOs.TripDTOs;

namespace TripPlanningService.Api.Endpoints.TripEndpoints
{
    public class GetTripDetailsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/Trips", async ([FromQuery]Guid tripId, ISender sender) =>
            {
                var query = new GetTripDetailsQuery(tripId);
                var result = await sender.Send(query);
                return Results.Ok(ApiResponse<GetTripDetailsDTO>.Success(result, "Trip details retrieved successfully."));
            });
        }
    }
}
