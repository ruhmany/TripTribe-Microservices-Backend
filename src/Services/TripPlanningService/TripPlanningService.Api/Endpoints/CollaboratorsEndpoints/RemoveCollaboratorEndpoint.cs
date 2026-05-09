using TripPlanningService.Application.CQRS.Commands.TripCollaboratorCommands;

namespace TripPlanningService.Api.Endpoints.CollaboratorsEndpoints
{
    public class RemoveCollaboratorEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("Trips/RemoveCollaborator", async (Guid tripOwnerId, Guid tripdId, Guid collaboratorId, ISender sender) =>
            {
                var command = new RemoveCollaboratorCommand(tripOwnerId, tripdId, collaboratorId);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
