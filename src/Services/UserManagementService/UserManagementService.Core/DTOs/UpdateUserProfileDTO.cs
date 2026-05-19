namespace UserManagementService.Core.DTOs
{
    public record UpdateUserProfileDTO(
        string FirstName,
        string LastName,
        string? Bio,
        string? AvatarUrl,
        DateOnly? DateOfBirth,
        string? Country,
        string? City,
        List<string>? TravelStyles);
}
