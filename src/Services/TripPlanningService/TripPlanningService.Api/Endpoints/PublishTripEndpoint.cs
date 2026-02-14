
namespace TripPlanningService.Api.Endpoints
{
    public class PublishTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/Trips/Publish", async (PublishTripDTO publishTripDTO, ISender sender) =>
            {
                var command = new PublishTripCommand(publishTripDTO);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
