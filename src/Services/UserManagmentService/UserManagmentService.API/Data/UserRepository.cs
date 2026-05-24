using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UserManagmentService.Domain.Interfaces;
using UserManagmentService.Domain.Models;

namespace UserManagmentService.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;

        public UserRepository(UserDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<User?> GetByGoogleIdAsync(string googleId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == googleId);
        }

        public async Task<User?> GetByFacebookIdAsync(string facebookId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.FacebookId == facebookId);
        }

        public async Task<User?> GetByAppleIdAsync(string appleId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.AppleId == appleId);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task UpdateAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
