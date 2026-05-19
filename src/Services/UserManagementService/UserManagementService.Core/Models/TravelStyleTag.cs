using UserManagementService.Core.Enums;

namespace UserManagementService.Core.Models
{
    public class TravelStyleTag
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public TravelStyle Tag { get; set; }

        // Navigation
        public User User { get; set; } = null!;
    }
}
