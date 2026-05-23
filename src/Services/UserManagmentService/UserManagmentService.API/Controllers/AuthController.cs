using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserManagmentService.Domain.DTOs;
using UserManagmentService.Domain.Interfaces;

namespace UserManagmentService.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.RegisterAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.LoginAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _userService.ConfirmEmailAsync(dto);
            if (success)
            {
                return Ok(new { message = "Email confirmed successfully." });
            }

            return BadRequest(new { message = "Invalid email or verification token." });
        }

        [HttpPost("confirm-phone")]
        public async Task<IActionResult> ConfirmPhone([FromBody] ConfirmPhoneDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _userService.ConfirmPhoneAsync(dto);
            if (success)
            {
                return Ok(new { message = "Phone number confirmed successfully." });
            }

            return BadRequest(new { message = "Invalid phone number or verification token." });
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userService.ForgetPasswordAsync(dto);
            return Ok(new { message = "If the email exists, a password reset link has been sent." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _userService.ResetPasswordAsync(dto);
            if (success)
            {
                return Ok(new { message = "Password reset successfully." });
            }

            return BadRequest(new { message = "Invalid reset token or expired token." });
        }

        [HttpPost("oauth")]
        public async Task<IActionResult> OAuthLogin([FromBody] OAuthLoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.OAuthLoginAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
