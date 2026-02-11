using FluentValidation;

namespace TripPlanningService.Application.CQRS.Commands
{
    public record CreateTripCommand(CreateTripDTO CreateTripDTO) : ICommand<CreateTripResult>
    {
    }

    public record CreateTripResult(Guid Id);

    public class CreateTripCommandValidator : AbstractValidator<CreateTripCommand>
    {
        public CreateTripCommandValidator()
        {
            RuleFor(x => x.CreateTripDTO.ownerId).NotEmpty().WithMessage("OwnerId is required");
            RuleFor(x => x.CreateTripDTO).Must(x => x.Start <= x.End);
            RuleFor(x => x.CreateTripDTO.title).MaximumLength(25);
            RuleFor(x => x.CreateTripDTO.description).MaximumLength(350);
        }
    }
}
