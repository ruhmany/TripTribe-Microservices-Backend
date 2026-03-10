using Microsoft.AspNetCore.Mvc;

namespace TripPlanningService.Api.Endpoints.DayEndpoints
{
    public class RemoveDayFromTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("Trips/RemoveDay", async ([FromBody]RemoveDayFromTripDTO removeDayFromTripDTO, ISender sender) =>
            {
                try
                {
                    var command = new RemoveDayFromTripCommand(removeDayFromTripDTO);
                    var result = await sender.Send(command);
                    return Results.Ok(result);
                }
                catch (KeyNotFoundException ex)
                {
                    return Results.NotFound(ex.Message);
                }
                catch (DomainException ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            });
        }
    }
}
