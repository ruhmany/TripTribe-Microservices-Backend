
namespace TripPlanningService.Api.Endpoints
{
    public class UpdateTripVisibiltyEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/Trips/Visibility", async ( ChangeTripVisibiltyDTO updateTripVisibilityDTO, ISender sender) =>
            {
                var command = new ChangeTripVisibilityCommand(updateTripVisibilityDTO);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
