using Microsoft.AspNetCore.Mvc;

namespace TripPlanningService.Api.Endpoints.ActivityEndpoints
{
    public class RemoveActivityFromDayEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("Trips/RemoveActivity", async ([FromBody]RemoveActivityFromDayDTO requestDTO, IMediator mediator) =>
            {
                var command = new RemoveActivityFromDayCommand(requestDTO.tripId, requestDTO.dayId, requestDTO.activityId, requestDTO.ownerId);
                await mediator.Send(command);
                return Results.NoContent();
            });
        }
        private record RemoveActivityFromDayDTO(Guid tripId, Guid dayId, Guid activityId, Guid ownerId);
    }
}
