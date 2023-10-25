using DataAccessLayer.Models.Entities;

namespace WebApi.Helpers
{
    public interface IAuthenticationHelper
    {
        string GenerateAccessToken(UserModel user);
        string GeneratePasswordHash(string password, string salt);
        string GenerateRefreshToken(UserModel user);
        string GenerateSalt();
        int ValidateRefreshTokenAndGetUserId(string? refreshToken);
    }
}