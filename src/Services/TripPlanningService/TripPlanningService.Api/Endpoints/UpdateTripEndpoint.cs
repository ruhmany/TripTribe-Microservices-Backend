
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TripPlanningService.Api.Endpoints
{
    public record UpdateTripRequest(UpdateTripDetailsDTO UpdateTripDTO);
    public class UpdateTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/Trips", async ([FromBody] UpdateTripRequest updateTripRequest, ISender sender) =>
            {
                var command = new UpdateTripDetailsCommand(updateTripRequest.UpdateTripDTO);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
