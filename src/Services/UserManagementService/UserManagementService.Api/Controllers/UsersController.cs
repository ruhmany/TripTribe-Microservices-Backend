using BuildingBlocks.ApiResponse;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using UserManagementService.Core.DTOs;
using UserManagementService.Core.Interfaces;

namespace UserManagementService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> GetProfile(Guid userId)
        {
            var result = await _userService.GetProfileAsync(userId);
            return Ok(ApiResponse<UserProfileDTO>.Success(result, "User profile retrieved successfully."));
        }

        [HttpGet("ByEmail")]
        public async Task<IActionResult> GetByEmail([FromQuery] string email)
        {
            var result = await _userService.GetByEmailAsync(email);
            return Ok(ApiResponse<UserProfileDTO>.Success(result, "User profile retrieved successfully."));
        }

        [HttpPut("{userId:guid}")]
        public async Task<IActionResult> UpdateProfile(
            Guid userId,
            [FromBody] UpdateUserProfileDTO dto,
            [FromServices] IValidator<UpdateUserProfileDTO> validator)
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return BadRequest(ApiResponse<object>.Fail("Validation failed.", StatusCodes.Status400BadRequest, errors));
            }

            var result = await _userService.UpdateProfileAsync(userId, dto);
            return Ok(ApiResponse<UserProfileDTO>.Success(result, "User profile updated successfully."));
        }

        [HttpPut("{userId:guid}/Deactivate")]
        public async Task<IActionResult> Deactivate(Guid userId)
        {
            await _userService.DeactivateAsync(userId);
            return Ok(ApiResponse.Success("User account deactivated successfully."));
        }
    }
}
