using System.Threading.Tasks;
using UserManagmentService.Domain.DTOs;

namespace UserManagmentService.Domain.Interfaces
{
    public interface IUserService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        Task<bool> ConfirmEmailAsync(ConfirmEmailDto dto);
        Task<bool> ConfirmPhoneAsync(ConfirmPhoneDto dto);
        Task<bool> ForgetPasswordAsync(ForgetPasswordDto dto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
        Task<AuthResponseDto> OAuthLoginAsync(OAuthLoginDto dto);
    }
}
