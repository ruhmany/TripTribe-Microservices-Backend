using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserManagementService.Core.DTOs;
using UserManagementService.Core.Interfaces;
using UserManagementService.Core.Models;

namespace UserManagementService.Infrastructure.Services
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IConfiguration _configuration;

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public AuthResponseDTO GenerateToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var key = jwtSettings["Key"]
                ?? throw new InvalidOperationException("JWT Key is not configured.");
            var issuer = jwtSettings["Issuer"]
                ?? throw new InvalidOperationException("JWT Issuer is not configured.");
            var audience = jwtSettings["Audience"]
                ?? throw new InvalidOperationException("JWT Audience is not configured.");
            var expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"] ?? "60");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var expiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new AuthResponseDTO(
                Token: tokenString,
                UserId: user.Id,
                UserName: user.UserName,
                Email: user.Email,
                ExpiresAt: expiresAt);
        }
    }
}
