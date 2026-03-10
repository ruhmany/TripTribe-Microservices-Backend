
namespace TripPlanningService.Application.CQRS.Commands.DayCommands
{
    public record AddDayToTripCommand(AddDayToTripDTO AddDayToTripDTO) : ICommand<AddDayToTripResult>
    {
    }

    public record AddDayToTripResult(Guid dayId, Guid tripId, DateOnly date);
}
