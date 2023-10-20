using Microsoft.Extensions.Options;
using System.Security.Cryptography;
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
            string saltedPassword = salt + password;

            string hash = BCryptNet.HashPassword(saltedPassword, BCryptNet.GenerateSalt());

            return hash;

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


    }
}
