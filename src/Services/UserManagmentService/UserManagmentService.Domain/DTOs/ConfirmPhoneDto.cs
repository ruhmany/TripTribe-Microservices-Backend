using System.ComponentModel.DataAnnotations;

namespace UserManagmentService.Domain.DTOs
{
    public class ConfirmPhoneDto
    {
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
