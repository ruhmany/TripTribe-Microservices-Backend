using UserManagmentService.Domain.Models;

namespace UserManagmentService.Domain.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
    }
}
