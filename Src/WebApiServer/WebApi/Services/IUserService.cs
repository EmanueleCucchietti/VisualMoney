using WebApi.Controllers;
using WebApi.Models.Dto.User;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<UserLoginResponseDto> Login(UserLoginDto userDto);
        Task Register(UserRegisterDto user);
    }
}