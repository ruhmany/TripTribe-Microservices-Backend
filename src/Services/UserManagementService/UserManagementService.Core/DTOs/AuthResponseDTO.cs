namespace UserManagementService.Core.DTOs
{
    public record AuthResponseDTO(
        string Token,
        Guid UserId,
        string UserName,
        string Email,
        DateTime ExpiresAt);
}
