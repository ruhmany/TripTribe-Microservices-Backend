using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UserManagmentService.Domain.Interfaces;
using UserManagmentService.Domain.Models;

namespace UserManagmentService.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var secretKey = _config["JwtSettings:Secret"] ?? "SuperSecretKeyForTripTribeAuthServiceThatIsLongEnoughToSatisfyHMACRequirements";
            var key = Encoding.ASCII.GetBytes(secretKey);

            var issuer = _config["JwtSettings:Issuer"] ?? "TripTribe";
            var audience = _config["JwtSettings:Audience"] ?? "TripTribeClients";
            var expiryMinutesStr = _config["JwtSettings:ExpiryMinutes"] ?? "60";
            if (!double.TryParse(expiryMinutesStr, out double expiryMinutes))
            {
                expiryMinutes = 60;
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("email_confirmed", user.IsEmailConfirmed.ToString().ToLower()),
                new Claim("phone_confirmed", user.IsPhoneNumberConfirmed.ToString().ToLower())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
