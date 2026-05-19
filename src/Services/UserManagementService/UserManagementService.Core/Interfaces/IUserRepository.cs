using UserManagementService.Core.Models;

namespace UserManagementService.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUserNameAsync(string userName);
        Task<User> AddAsync(User user);
        Task UpdateAsync(User user);
        Task<bool> ExistsAsync(Guid id);
    }
}
