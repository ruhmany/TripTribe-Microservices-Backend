using BuildingBlocks.ApiResponse;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using UserManagementService.Core.DTOs;
using UserManagementService.Core.Interfaces;

namespace UserManagementService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterUserDTO dto,
            [FromServices] IValidator<RegisterUserDTO> validator)
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return BadRequest(ApiResponse<object>.Fail("Validation failed.", StatusCodes.Status400BadRequest, errors));
            }

            var result = await _authService.RegisterAsync(dto);
            return Created("", ApiResponse<AuthResponseDTO>.Success(result, "User registered successfully.", StatusCodes.Status201Created));
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginDTO dto,
            [FromServices] IValidator<LoginDTO> validator)
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return BadRequest(ApiResponse<object>.Fail("Validation failed.", StatusCodes.Status400BadRequest, errors));
            }

            var result = await _authService.LoginAsync(dto);
            return Ok(ApiResponse<AuthResponseDTO>.Success(result, "Login successful."));
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(
            [FromQuery] Guid userId,
            [FromBody] ChangePasswordDTO dto,
            [FromServices] IValidator<ChangePasswordDTO> validator)
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return BadRequest(ApiResponse<object>.Fail("Validation failed.", StatusCodes.Status400BadRequest, errors));
            }

            await _authService.ChangePasswordAsync(userId, dto);
            return Ok(ApiResponse.Success("Password changed successfully."));
        }
    }
}
