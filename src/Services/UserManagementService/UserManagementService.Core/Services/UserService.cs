using UserManagementService.Core.DTOs;
using UserManagementService.Core.Enums;
using UserManagementService.Core.Interfaces;
using UserManagementService.Core.Models;

namespace UserManagementService.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserProfileDTO> GetProfileAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new KeyNotFoundException($"User with ID '{userId}' was not found.");

            return MapToProfileDTO(user);
        }

        public async Task<UserProfileDTO> GetByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email.Trim().ToLowerInvariant())
                ?? throw new KeyNotFoundException($"User with email '{email}' was not found.");

            return MapToProfileDTO(user);
        }

        public async Task<UserProfileDTO> UpdateProfileAsync(Guid userId, UpdateUserProfileDTO dto)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new KeyNotFoundException($"User with ID '{userId}' was not found.");

            user.FirstName = dto.FirstName.Trim();
            user.LastName = dto.LastName.Trim();
            user.Bio = dto.Bio?.Trim();
            user.AvatarUrl = dto.AvatarUrl?.Trim();
            user.DateOfBirth = dto.DateOfBirth;
            user.Country = dto.Country?.Trim();
            user.City = dto.City?.Trim();
            user.LastModified = DateTime.UtcNow;

            // Sync travel style tags
            if (dto.TravelStyles != null)
            {
                user.TravelStyleTags.Clear();
                foreach (var style in dto.TravelStyles.Distinct())
                {
                    if (Enum.TryParse<TravelStyle>(style, ignoreCase: true, out var parsed))
                    {
                        user.TravelStyleTags.Add(new TravelStyleTag
                        {
                            Id = Guid.NewGuid(),
                            UserId = user.Id,
                            Tag = parsed
                        });
                    }
                }
            }

            await _userRepository.UpdateAsync(user);

            return MapToProfileDTO(user);
        }

        public async Task DeactivateAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new KeyNotFoundException($"User with ID '{userId}' was not found.");

            user.IsActive = false;
            user.LastModified = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);
        }

        private static UserProfileDTO MapToProfileDTO(User user)
        {
            return new UserProfileDTO(
                Id: user.Id,
                Email: user.Email,
                UserName: user.UserName,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Bio: user.Bio,
                AvatarUrl: user.AvatarUrl,
                DateOfBirth: user.DateOfBirth,
                Country: user.Country,
                City: user.City,
                IsActive: user.IsActive,
                CountriesVisited: user.CountriesVisited,
                CitiesVisited: user.CitiesVisited,
                TripsCompleted: user.TripsCompleted,
                TravelStyles: user.TravelStyleTags.Select(t => t.Tag.ToString()).ToList());
        }
    }
}
