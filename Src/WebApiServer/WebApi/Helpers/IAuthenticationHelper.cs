namespace WebApi.Helpers
{
    public interface IAuthenticationHelper
    {
        string GeneratePasswordHash(string password, string salt);
        string GenerateSalt();
    }
}