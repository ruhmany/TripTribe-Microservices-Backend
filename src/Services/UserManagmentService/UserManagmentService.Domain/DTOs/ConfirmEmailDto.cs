using System.ComponentModel.DataAnnotations;

namespace UserManagmentService.Domain.DTOs
{
    public class ConfirmEmailDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
