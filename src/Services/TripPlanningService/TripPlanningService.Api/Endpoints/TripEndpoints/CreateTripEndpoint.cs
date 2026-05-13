using TripPlanningService.Application.DTOs.TripDTOs;

namespace TripPlanningService.Api.Endpoints.TripEndpoints
{

    public record CreateTripRequest(CreateTripDTO CreateTripDTO);

    public class CreateTripEndpoint : ICarterModule
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

                return Results.Created($"/Trips?tripId={result.Id}",
                    ApiResponse<CreateTripResult>.Success(result, "Trip created successfully.", StatusCodes.Status201Created));
            });
        }
    }
}
