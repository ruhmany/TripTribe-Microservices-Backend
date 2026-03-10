
using TripPlanningService.Application.DTOs.TripDTOs;

namespace TripPlanningService.Api.Endpoints.TripEndpoints
{
    public class ChangeDateRangeEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("Trips/ChangeDateRange", async (ChangeTripDateRangeDTO changeTripDateRange, ISender sender) =>
            {
                var command = new ChangTripDateRangeCommand(changeTripDateRange);
                var result = await sender.Send(command);
                return Results.Ok(result);
            });
        }
    }
}
