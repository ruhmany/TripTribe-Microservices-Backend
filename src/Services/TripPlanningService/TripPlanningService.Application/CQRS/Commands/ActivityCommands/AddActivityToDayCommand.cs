namespace TripPlanningService.Application.CQRS.Commands.ActivityCommands
{
    public record AddActivityToDayCommand(AddActivityToDayDTO AddActivityToDayDTO) : ICommand<bool>
    {
    }
}
