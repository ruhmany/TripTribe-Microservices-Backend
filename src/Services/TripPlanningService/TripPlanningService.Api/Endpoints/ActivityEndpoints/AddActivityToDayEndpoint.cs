namespace TripPlanningService.Api.Endpoints.ActivityEndpoints
{
    public class AddActivityToDayEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/AddActivity", async (AddActivityToDayDTO addActivityToDayDTO, ISender sender) =>
            {
                try
                {
                    var command = new AddActivityToDayCommand(addActivityToDayDTO);
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
