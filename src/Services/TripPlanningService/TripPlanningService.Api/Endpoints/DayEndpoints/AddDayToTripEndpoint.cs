namespace TripPlanningService.Api.Endpoints.DayEndpoints
{
    public class AddDayToTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/AddDay", async (AddDayToTripDTO addDayToTripDTO, ISender sender) =>
            {
                var command = new AddDayToTripCommand(addDayToTripDTO);
                var result = await sender.Send(command);
                return Results.Created($"/Trips?tripId={result.tripId}",
                    ApiResponse<AddDayToTripResult>.Success(result, "Day added to trip successfully.", StatusCodes.Status201Created));
            });
        }
    }
}
