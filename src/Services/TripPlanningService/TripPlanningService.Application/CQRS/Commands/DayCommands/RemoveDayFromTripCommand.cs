namespace TripPlanningService.Application.CQRS.Commands.DayCommands
{
    public record RemoveDayFromTripCommand(RemoveDayFromTripDTO RemoveDayFromTripDTO) : ICommand<RemoveDayFromTripResult>
    {
    }

    public record RemoveDayFromTripResult(Guid TripId, Guid DayId);
}
