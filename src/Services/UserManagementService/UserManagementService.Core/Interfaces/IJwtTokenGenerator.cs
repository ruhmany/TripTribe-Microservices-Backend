using UserManagementService.Core.DTOs;
using UserManagementService.Core.Models;

namespace UserManagementService.Core.Interfaces
{
    public interface IJwtTokenGenerator
    {
        AuthResponseDTO GenerateToken(User user);
    }
}
