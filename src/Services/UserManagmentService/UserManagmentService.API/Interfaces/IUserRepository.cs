using System;
using System.Threading.Tasks;
using UserManagmentService.Domain.Models;

namespace UserManagmentService.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByPhoneNumberAsync(string phoneNumber);
        Task<User?> GetByGoogleIdAsync(string googleId);
        Task<User?> GetByFacebookIdAsync(string facebookId);
        Task<User?> GetByAppleIdAsync(string appleId);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task SaveChangesAsync();
    }
}
