namespace TripPlanningService.Api.Endpoints
{

    public record CreateTripRequest(CreateTripDTO CreateTripDTO);

    public class CreateTripEdpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/Trips", async (CreateTripRequest request, ISender sender) =>
            {
                var dto = new CreateTripDTO(
                    request.CreateTripDTO.ownerId,
                    request.CreateTripDTO.createdBy,
                    request.CreateTripDTO.title,
                    request.CreateTripDTO.description,
                    request.CreateTripDTO.visibility,
                    request.CreateTripDTO.status,
                    request.CreateTripDTO.Start,
                    request.CreateTripDTO.End);

                var command = new CreateTripCommand(dto);

                var result = await sender.Send(command);

                return Results.Ok(result);
            });
        }
    }
}
