using System;
using System.Threading.Tasks;
using BCrypt.Net;
using UserManagmentService.Domain.DTOs;
using UserManagmentService.Domain.Interfaces;
using UserManagmentService.Domain.Models;

namespace UserManagmentService.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly ITokenService _tokenService;
        private readonly IOAuthService _oauthService;
        private readonly IEmailSmsService _emailSmsService;

        public UserService(
            IUserRepository repository,
            ITokenService tokenService,
            IOAuthService oauthService,
            IEmailSmsService emailSmsService)
        {
            _repository = repository;
            _tokenService = tokenService;
            _oauthService = oauthService;
            _emailSmsService = emailSmsService;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _repository.GetByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                throw new ArgumentException("A user with this email address already exists.");
            }

            var existingPhone = await _repository.GetByPhoneNumberAsync(dto.PhoneNumber);
            if (existingPhone != null)
            {
                throw new ArgumentException("A user with this phone number already exists.");
            }

            var emailToken = Guid.NewGuid().ToString("N");
            var phoneToken = new Random().Next(100000, 999999).ToString(); // 6 digit SMS pin

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                IsEmailConfirmed = false,
                IsPhoneNumberConfirmed = false,
                EmailConfirmationToken = emailToken,
                PhoneConfirmationToken = phoneToken,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();

            // Send verification emails / sms asynchronously (simulated)
            await _emailSmsService.SendEmailConfirmationAsync(user.Email, emailToken);
            await _emailSmsService.SendPhoneConfirmationAsync(user.PhoneNumber, phoneToken);

            var token = _tokenService.GenerateJwtToken(user);

            return MapToAuthResponse(user, token);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
            if (user == null || string.IsNullOrEmpty(user.PasswordHash) || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                throw new ArgumentException("Invalid email address or password.");
            }

            var token = _tokenService.GenerateJwtToken(user);
            return MapToAuthResponse(user, token);
        }

        public async Task<bool> ConfirmEmailAsync(ConfirmEmailDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
            if (user == null || user.EmailConfirmationToken != dto.Token)
            {
                return false;
            }

            user.IsEmailConfirmed = true;
            user.EmailConfirmationToken = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmPhoneAsync(ConfirmPhoneDto dto)
        {
            var user = await _repository.GetByPhoneNumberAsync(dto.PhoneNumber);
            if (user == null || user.PhoneConfirmationToken != dto.Token)
            {
                return false;
            }

            user.IsPhoneNumberConfirmed = true;
            user.PhoneConfirmationToken = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ForgetPasswordAsync(ForgetPasswordDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
            if (user == null)
            {
                // Don't leak details about whether a user exists, but we return true to not indicate failure.
                // In a production app, we still mock the time delay.
                return true;
            }

            var resetToken = Guid.NewGuid().ToString("N");
            user.PasswordResetToken = resetToken;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(2);
            user.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();

            await _emailSmsService.SendPasswordResetAsync(user.Email, resetToken);
            return true;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
            if (user == null || user.PasswordResetToken != dto.Token || user.PasswordResetTokenExpiry < DateTime.UtcNow)
            {
                return false;
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<AuthResponseDto> OAuthLoginAsync(OAuthLoginDto dto)
        {
            var oAuthInfo = await _oauthService.VerifyTokenAsync(dto.Provider, dto.Token);
            if (oAuthInfo == null)
            {
                throw new ArgumentException("OAuth token verification failed.");
            }

            // Find user by provider ID
            User? user = dto.Provider.ToLower() switch
            {
                "google" => await _repository.GetByGoogleIdAsync(oAuthInfo.ProviderId),
                "facebook" => await _repository.GetByFacebookIdAsync(oAuthInfo.ProviderId),
                "apple" => await _repository.GetByAppleIdAsync(oAuthInfo.ProviderId),
                _ => null
            };

            if (user == null)
            {
                // Try to find user by email
                user = await _repository.GetByEmailAsync(oAuthInfo.Email);
                if (user != null)
                {
                    // Link provider ID
                    LinkProvider(user, dto.Provider, oAuthInfo.ProviderId);
                    user.UpdatedAt = DateTime.UtcNow;
                    await _repository.UpdateAsync(user);
                }
                else
                {
                    // Create new user
                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        Email = oAuthInfo.Email,
                        IsEmailConfirmed = true, // Verified by OAuth provider
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    LinkProvider(user, dto.Provider, oAuthInfo.ProviderId);

                    await _repository.AddAsync(user);
                }
                await _repository.SaveChangesAsync();
            }

            var jwtToken = _tokenService.GenerateJwtToken(user);
            return MapToAuthResponse(user, jwtToken);
        }

        private void LinkProvider(User user, string provider, string providerId)
        {
            switch (provider.ToLower())
            {
                case "google":
                    user.GoogleId = providerId;
                    break;
                case "facebook":
                    user.FacebookId = providerId;
                    break;
                case "apple":
                    user.AppleId = providerId;
                    break;
            }
        }

        private AuthResponseDto MapToAuthResponse(User user, string token)
        {
            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    IsEmailConfirmed = user.IsEmailConfirmed,
                    IsPhoneNumberConfirmed = user.IsPhoneNumberConfirmed
                }
            };
        }
    }
}
