namespace TripPlanningService.Api.Endpoints.DayEndpoints
{
    public class RemoveDayFromTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("Trips/RemoveDay", async (RemoveDayFromTripDTO removeDayFromTripDTO, ISender sender) =>
            {
                var command = new RemoveDayFromTripCommand(removeDayFromTripDTO);
                var result = await sender.Send(command);
                return Results.Ok(ApiResponse<RemoveDayFromTripResult>.Success(result, "Day removed from trip successfully."));
            });
        }
    }
}
