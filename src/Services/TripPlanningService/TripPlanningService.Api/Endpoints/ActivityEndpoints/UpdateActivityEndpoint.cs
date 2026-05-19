namespace TripPlanningService.Api.Endpoints.ActivityEndpoints
{
    public class UpdateActivityEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("Trips/UpdateActivity", async (AddEditActivityToDayDTO editActivityDTO, ISender sender) =>
            {
                var command = new UpdateActivityCommand(editActivityDTO);
                var result = await sender.Send(command);
                return Results.Ok(ApiResponse<bool>.Success(result, "Activity updated successfully."));
            }).WithTags("Activities");
        }
    }
}
