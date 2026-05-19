using UserManagementService.Core.DTOs;
using UserManagementService.Core.Interfaces;
using UserManagementService.Core.Models;

namespace UserManagementService.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthService(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterUserDTO dto)
        {
            var existingByEmail = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingByEmail != null)
                throw new InvalidOperationException("A user with this email already exists.");

            var existingByUserName = await _userRepository.GetByUserNameAsync(dto.UserName);
            if (existingByUserName != null)
                throw new InvalidOperationException("A user with this username already exists.");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                UserName = dto.UserName.Trim(),
                PasswordHash = _passwordHasher.Hash(dto.Password),
                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName.Trim(),
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                LastModified = DateTime.UtcNow,
                IsDeleted = false
            };

            await _userRepository.AddAsync(user);

            return _jwtTokenGenerator.GenerateToken(user);
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email.Trim().ToLowerInvariant());
            if (user == null || !user.IsActive)
                throw new UnauthorizedAccessException("Invalid email or password.");

            if (!_passwordHasher.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password.");

            return _jwtTokenGenerator.GenerateToken(user);
        }

        public async Task ChangePasswordAsync(Guid userId, ChangePasswordDTO dto)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new KeyNotFoundException($"User with ID '{userId}' was not found.");

            if (!_passwordHasher.Verify(dto.OldPassword, user.PasswordHash))
                throw new UnauthorizedAccessException("Current password is incorrect.");

            user.PasswordHash = _passwordHasher.Hash(dto.NewPassword);
            user.LastModified = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);
        }
    }
}
