using System.ComponentModel.DataAnnotations;

namespace UserManagmentService.Domain.DTOs
{
    public class OAuthLoginDto
    {
        [Required]
        [RegularExpression("^(google|facebook|apple)$", ErrorMessage = "Provider must be google, facebook, or apple.")]
        public string Provider { get; set; } = string.Empty;

        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
