namespace TripPlanningService.Application.CQRS.Commands.TripCommands
{
    public record ChangeTripVisibilityResult(Guid tripId, TripVisibility Visibility);
    public record ChangeTripVisibilityCommand(ChangeTripVisibiltyDTO changeTripVisibilty) : ICommand<ChangeTripVisibilityResult>
    {
    }

    public class ValidateTripVisibilityCommand : AbstractValidator<ChangeTripVisibilityCommand>
    {
        public ValidateTripVisibilityCommand()
        {
            RuleFor(x => x.changeTripVisibilty.tripId).NotNull();
            RuleFor(x => x.changeTripVisibilty.ownerId).NotNull();
        }
    }
}
