using TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands;
using TripPlanningService.Domain.Enums;

namespace TripPlanningService.Api.Endpoints.CollaboratorsEndpoints
{
    public class AddCollaboratorEndpoint : ICarterModule
    {
        record AddCollaboratorRequestModel(Guid tripId, Guid collaboratorId, TripRole collaboratorRole);

        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/AddCollaborator", async (AddCollaboratorRequestModel request, ISender sender) =>
            {
                var command = new AddTripCollaboratorCommand(request.tripId, request.collaboratorId, request.collaboratorRole);
                var result = await sender.Send(command);
                return Results.Created("",
                    ApiResponse<bool>.Success(result, "Collaborator added successfully.", StatusCodes.Status201Created));
            });
        }
    }
}
