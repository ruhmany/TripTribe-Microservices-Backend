namespace UserManagementService.Core.DTOs
{
    public record ChangePasswordDTO(
        string OldPassword,
        string NewPassword);
}
