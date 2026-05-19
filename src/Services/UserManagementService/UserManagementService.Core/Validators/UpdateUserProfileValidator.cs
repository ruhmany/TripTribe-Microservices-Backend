using FluentValidation;
using UserManagementService.Core.DTOs;

namespace UserManagementService.Core.Validators
{
    public class UpdateUserProfileValidator : AbstractValidator<UpdateUserProfileDTO>
    {
        public UpdateUserProfileValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name is required.")
                .MaximumLength(100).WithMessage("First name cannot exceed 100 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last name is required.")
                .MaximumLength(100).WithMessage("Last name cannot exceed 100 characters.");

            RuleFor(x => x.Bio)
                .MaximumLength(500).WithMessage("Bio cannot exceed 500 characters.")
                .When(x => x.Bio != null);
        }
    }
}
