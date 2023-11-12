namespace WebApi.Models.Dto.User
{
    public class UserLoginResponseDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

    }
}
