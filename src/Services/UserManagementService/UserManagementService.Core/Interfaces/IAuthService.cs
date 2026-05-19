using UserManagementService.Core.DTOs;

namespace UserManagementService.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterUserDTO dto);
        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);
        Task ChangePasswordAsync(Guid userId, ChangePasswordDTO dto);
    }
}
