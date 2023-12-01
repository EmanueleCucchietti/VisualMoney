using WebApi.Models.Dto.User;

namespace WebApi.Services.User
{
    public interface IUserService
    {
        Task<bool> IsEmailAvailable(string email);
        Task<bool> IsUsernameAvailable(string username);
        Task<UserLoginResponseDto> Login(UserLoginDto userDto);
        Task<UserLoginResponseDto> RefreshToken(string? refreshToken);
        Task Register(UserRegisterDto user);
    }
}