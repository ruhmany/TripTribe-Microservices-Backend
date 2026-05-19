namespace UserManagementService.Core.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public bool IsActive { get; set; } = true;

        // Denormalized travel stats (updated by external services via events)
        public int CountriesVisited { get; set; }
        public int CitiesVisited { get; set; }
        public int TripsCompleted { get; set; }

        // Audit fields
        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }
        public bool IsDeleted { get; set; }

        // Navigation
        public List<TravelStyleTag> TravelStyleTags { get; set; } = new();
    }
}
