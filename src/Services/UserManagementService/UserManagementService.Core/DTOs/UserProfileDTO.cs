namespace UserManagementService.Core.DTOs
{
    public record UserProfileDTO(
        Guid Id,
        string Email,
        string UserName,
        string FirstName,
        string LastName,
        string? Bio,
        string? AvatarUrl,
        DateOnly? DateOfBirth,
        string? Country,
        string? City,
        bool IsActive,
        int CountriesVisited,
        int CitiesVisited,
        int TripsCompleted,
        List<string> TravelStyles);
}
