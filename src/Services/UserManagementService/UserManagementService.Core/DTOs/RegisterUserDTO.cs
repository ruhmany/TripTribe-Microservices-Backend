namespace UserManagementService.Core.DTOs
{
    public record RegisterUserDTO(
        string Email,
        string UserName,
        string Password,
        string FirstName,
        string LastName);
}
