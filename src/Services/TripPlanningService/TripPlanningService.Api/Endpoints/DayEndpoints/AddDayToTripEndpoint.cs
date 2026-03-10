namespace TripPlanningService.Api.Endpoints.DayEndpoints
{
    public class AddDayToTripEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/AddDay", async (AddDayToTripDTO addDayToTripDTO, ISender sender) =>
            {
                try
                {
                    var command = new AddDayToTripCommand(addDayToTripDTO);
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
