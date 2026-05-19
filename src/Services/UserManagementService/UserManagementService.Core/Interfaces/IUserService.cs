using UserManagementService.Core.DTOs;

namespace UserManagementService.Core.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileDTO> GetProfileAsync(Guid userId);
        Task<UserProfileDTO> GetByEmailAsync(string email);
        Task<UserProfileDTO> UpdateProfileAsync(Guid userId, UpdateUserProfileDTO dto);
        Task DeactivateAsync(Guid userId);
    }
}
