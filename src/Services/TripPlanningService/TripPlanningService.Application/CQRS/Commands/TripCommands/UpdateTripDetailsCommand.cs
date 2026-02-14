using FluentValidation;
namespace TripPlanningService.Application.CQRS.Commands.TripCommands
{
    public record UpdateTripDetailsCommand(UpdateTripDetailsDTO TripUpdateDetailsDTO) : ICommand<UpdateTripResult>
    {
    }

    public record UpdateTripResult(Guid tripId, string title, string details);


    public class UpdateTripDetailsValidation : AbstractValidator<UpdateTripDetailsCommand>
    {
        public UpdateTripDetailsValidation()
        {
            RuleFor(x => x.TripUpdateDetailsDTO.tripId).NotNull();
            RuleFor(x => x.TripUpdateDetailsDTO.title).MaximumLength(70);
            RuleFor(x => x.TripUpdateDetailsDTO.description).MaximumLength(700);
        }
    }
}
