using System.Threading.Tasks;

namespace UserManagmentService.Domain.Interfaces
{
    public class OAuthUserInfo
    {
        public string ProviderId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }

    public interface IOAuthService
    {
        Task<OAuthUserInfo?> VerifyTokenAsync(string provider, string token);
    }
}
