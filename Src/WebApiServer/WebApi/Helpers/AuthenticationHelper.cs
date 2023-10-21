using DataAccessLayer.Models.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApi.Configuration;
using BCryptNet = BCrypt.Net.BCrypt;

namespace WebApi.Helpers
{
    public class AuthenticationHelper : IAuthenticationHelper
    {
        public readonly JwtConfiguration _jwtConfiguration;

        public AuthenticationHelper(IOptions<JwtConfiguration> jwtConfiguration)
        {
            _jwtConfiguration = jwtConfiguration.Value;
        }

        public string GenerateSalt()
        {
            return BCryptNet.GenerateSalt();
        }

        public string GeneratePasswordHash(string password, string salt)
        {
            return BCryptNet.HashPassword(password, salt);
        }

        public static bool VerifyBcryptHash(string password, string storedHash, string storedSalt)
        {
            if (string.IsNullOrEmpty(password)
                || string.IsNullOrEmpty(storedHash)
                || string.IsNullOrEmpty(storedSalt))
            {
                return false;
            }

            // Generate the hash using BCrypt and the stored salt
            string generatedHash = BCryptNet.HashPassword(password, storedSalt);

            // Compare the generated hash with the stored hash
            return storedHash == generatedHash;
        }

        public string GenerateAccessToken(UserModel user)
        {
            return GenerateJwtTokenWithClaims(
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.Role, user.Role)
            );
        }

        public string GenerateRefreshToken(UserModel user)
        {
            return GenerateJwtTokenWithClaims(
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("Refresh-Token", true.ToString())
            );
        }

        private string GenerateJwtTokenWithClaims(params Claim[] claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              _jwtConfiguration.Issuer,
              _jwtConfiguration.Audience,
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
