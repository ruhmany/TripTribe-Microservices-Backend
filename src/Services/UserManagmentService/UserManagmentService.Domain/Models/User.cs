using System;

namespace UserManagmentService.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        // Confirmation states
        public bool IsEmailConfirmed { get; set; }
        public bool IsPhoneNumberConfirmed { get; set; }
        public string? EmailConfirmationToken { get; set; }
        public string? PhoneConfirmationToken { get; set; }

        // Password Reset fields
        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpiry { get; set; }

        // OAuth 2.0 identifiers
        public string? GoogleId { get; set; }
        public string? FacebookId { get; set; }
        public string? AppleId { get; set; }

        // Audit logs
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
