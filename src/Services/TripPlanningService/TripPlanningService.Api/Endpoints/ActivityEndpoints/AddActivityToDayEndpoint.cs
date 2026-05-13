namespace TripPlanningService.Api.Endpoints.ActivityEndpoints
{
    public class AddActivityToDayEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/AddActivity", async (AddEditActivityToDayDTO addActivityToDayDTO, ISender sender) =>
            {
                var command = new AddActivityToDayCommand(addActivityToDayDTO);
                var result = await sender.Send(command);
                return Results.Created("",
                    ApiResponse<bool>.Success(result, "Activity added to day successfully.", StatusCodes.Status201Created));
            });
        }
    }
}
