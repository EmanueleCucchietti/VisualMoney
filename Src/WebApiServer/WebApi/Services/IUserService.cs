using WebApi.Controllers;
using WebApi.Models.Dto.User;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<UserLoginResponseDto> Login(UserLoginDto userDto);
        Task<UserLoginResponseDto> RefreshToken(string? refreshToken);
        Task Register(UserRegisterDto user);
    }
}