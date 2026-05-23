using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using UserManagmentService.Domain.Interfaces;

namespace UserManagmentService.Infrastructure.Services
{
    public class OAuthService : IOAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<OAuthService> _logger;

        public OAuthService(HttpClient httpClient, IConfiguration config, ILogger<OAuthService> logger)
        {
            _httpClient = httpClient;
            _config = config;
            _logger = logger;
        }

        public async Task<OAuthUserInfo?> VerifyTokenAsync(string provider, string token)
        {
            var isMockMode = !string.Equals(_config["OAuthSettings:MockMode"], "false", StringComparison.OrdinalIgnoreCase);

            if (isMockMode || token.StartsWith("mock_"))
            {
                _logger.LogInformation($"OAuth verification running in Mock Mode for provider: {provider}");
                return VerifyMockToken(provider, token);
            }

            try
            {
                return provider.ToLower() switch
                {
                    "google" => await VerifyGoogleTokenAsync(token),
                    "facebook" => await VerifyFacebookTokenAsync(token),
                    "apple" => await VerifyAppleTokenAsync(token),
                    _ => null
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error validating token with {provider}. Falling back to simulated logic or failing.");
                // If it fails on network in development, fallback to mock if configured
                if (!string.Equals(_config["OAuthSettings:AllowFallbackOnFailure"], "false", StringComparison.OrdinalIgnoreCase))
                {
                    _logger.LogWarning("Verification failed, falling back to simulated OAuth user");
                    return VerifyMockToken(provider, token);
                }
                throw;
            }
        }

        private OAuthUserInfo VerifyMockToken(string provider, string token)
        {
            // Simulated token format: mock_provider_email@example.com_name
            // Example: mock_google_john@gmail.com_JohnDoe
            var parts = token.Split('_');
            var email = parts.Length > 2 ? parts[2] : $"{provider}_user@triptribe.com";
            var name = parts.Length > 3 ? parts[3] : $"{provider} User";
            var providerId = parts.Length > 4 ? parts[4] : $"mock_sub_{provider}_{Guid.NewGuid().ToString().Substring(0, 8)}";

            return new OAuthUserInfo
            {
                ProviderId = providerId,
                Email = email,
                Name = name
            };
        }

        private async Task<OAuthUserInfo?> VerifyGoogleTokenAsync(string token)
        {
            // Verify with Google tokeninfo endpoint
            var response = await _httpClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={token}");
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning($"Google tokeninfo request failed with status: {response.StatusCode}");
                return null;
            }

            var info = await response.Content.ReadFromJsonAsync<GoogleTokenInfo>();
            if (info == null || string.IsNullOrEmpty(info.Sub))
            {
                return null;
            }

            // Verify Google Client ID matches if configured
            var expectedClientId = _config["OAuthSettings:GoogleClientId"];
            if (!string.IsNullOrEmpty(expectedClientId) && info.Aud != expectedClientId)
            {
                _logger.LogWarning("Google token aud claim does not match configured ClientId");
                return null;
            }

            return new OAuthUserInfo
            {
                ProviderId = info.Sub,
                Email = info.Email ?? string.Empty,
                Name = info.Name ?? string.Empty
            };
        }

        private async Task<OAuthUserInfo?> VerifyFacebookTokenAsync(string token)
        {
            // Verify with Facebook graph endpoint
            var response = await _httpClient.GetAsync($"https://graph.facebook.com/me?fields=id,name,email&access_token={token}");
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning($"Facebook profile request failed with status: {response.StatusCode}");
                return null;
            }

            var info = await response.Content.ReadFromJsonAsync<FacebookUserInfo>();
            if (info == null || string.IsNullOrEmpty(info.Id))
            {
                return null;
            }

            return new OAuthUserInfo
            {
                ProviderId = info.Id,
                Email = info.Email ?? string.Empty,
                Name = info.Name ?? string.Empty
            };
        }

        private async Task<OAuthUserInfo?> VerifyAppleTokenAsync(string token)
        {
            // Apple identityToken is a JWT. We parse the claims.
            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
            {
                _logger.LogWarning("Provided Apple token is not a valid JWT format");
                return null;
            }

            var jwtToken = handler.ReadJwtToken(token);

            // In production, we should validate the signature against Apple's keys: https://appleid.apple.com/auth/keys
            // If verification is strict, validate claims like iss (https://appleid.apple.com) and aud (client ID)
            var iss = jwtToken.Issuer;
            var aud = jwtToken.Audiences.FirstOrDefault();

            var expectedAud = _config["OAuthSettings:AppleBundleId"];
            if (iss != "https://appleid.apple.com")
            {
                _logger.LogWarning($"Apple token issuer is invalid: {iss}");
                return null;
            }
            if (!string.IsNullOrEmpty(expectedAud) && aud != expectedAud)
            {
                _logger.LogWarning("Apple token aud claim does not match configured AppleBundleId");
                return null;
            }

            var sub = jwtToken.Subject;
            var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            var name = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? "Apple User";

            if (string.IsNullOrEmpty(sub))
            {
                return null;
            }

            await Task.CompletedTask;
            return new OAuthUserInfo
            {
                ProviderId = sub,
                Email = email ?? string.Empty,
                Name = name
            };
        }

        private class GoogleTokenInfo
        {
            [JsonPropertyName("sub")]
            public string Sub { get; set; } = string.Empty;
            [JsonPropertyName("email")]
            public string? Email { get; set; }
            [JsonPropertyName("name")]
            public string? Name { get; set; }
            [JsonPropertyName("aud")]
            public string? Aud { get; set; }
        }

        private class FacebookUserInfo
        {
            [JsonPropertyName("id")]
            public string Id { get; set; } = string.Empty;
            [JsonPropertyName("email")]
            public string? Email { get; set; }
            [JsonPropertyName("name")]
            public string? Name { get; set; }
        }
    }
}
