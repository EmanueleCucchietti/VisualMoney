using AutoMapper;
using DataAccessLayer.Data;
using DataAccessLayer.Models.Entities;
using WebApi.Controllers;
using WebApi.Helpers;
using WebApi.Models.Dto.User;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserData _userData;
        private readonly IMapper _mapper;
        private readonly IAuthenticationHelper _authenticationHelper;

        public UserService(IUserData userData,
                           IMapper mapper,
                           IAuthenticationHelper authenticationHelper)
        {
            _userData = userData;
            _mapper = mapper;
            _authenticationHelper = authenticationHelper;
        }

        public async Task Register(UserRegisterDto userDto)
        {
            try
            {
                var user = _mapper.Map<UserModel>(userDto);

                user.PasswordSalt = _authenticationHelper.GenerateSalt();

                user.PasswordHash = _authenticationHelper.GeneratePasswordHash(
                    userDto.Password, user.PasswordSalt);

                await _userData.CreateUserIfNotExists(user);

            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<UserLoginResponseDto> Login(UserLoginDto userDto)
        {
            try
            {
                var user = await _userData.GetUserByEmailOrUsername(userDto.EmailOrUsername);

                if (user is null || 
                    _authenticationHelper.GeneratePasswordHash(userDto.Password, user.PasswordSalt)
                        != user.PasswordHash)
                    throw new Exception("User not found or wrong password");

                var responseDto = new UserLoginResponseDto();

                responseDto.AccessToken = _authenticationHelper.GenerateAccessToken(user);

                responseDto.RefreshToken = _authenticationHelper.GenerateRefreshToken(user);

                return responseDto;


            } catch(Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
    }
}
