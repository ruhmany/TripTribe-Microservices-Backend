namespace TripPlanningService.Application.CQRS.Commands.ActivityCommands
{
    public record AddActivityToDayCommand(AddEditActivityToDayDTO AddActivityToDayDTO) : ICommand<bool>
    {
    }
}
