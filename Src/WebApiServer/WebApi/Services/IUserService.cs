using WebApi.Models.Dto.User;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task Register(UserRegisterDto user);
    }
}