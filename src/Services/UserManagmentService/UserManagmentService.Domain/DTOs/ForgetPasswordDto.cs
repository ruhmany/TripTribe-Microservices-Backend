using System.ComponentModel.DataAnnotations;

namespace UserManagmentService.Domain.DTOs
{
    public class ForgetPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
