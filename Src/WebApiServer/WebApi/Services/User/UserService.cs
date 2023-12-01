using AutoMapper;
using DataAccessLayer.Data.User;
using DataAccessLayer.Models.Entities;
using WebApi.Helpers;
using WebApi.Models.Dto.User;

namespace WebApi.Services.User
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
            var user = _mapper.Map<UserModel>(userDto);

            user.PasswordSalt = _authenticationHelper.GenerateSalt();

            user.PasswordHash = _authenticationHelper.GeneratePasswordHash(
                userDto.Password, user.PasswordSalt);

            await _userData.CreateUserIfNotExists(user);
        }

        public async Task<UserLoginResponseDto> Login(UserLoginDto userDto)
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
        }

        public async Task<UserLoginResponseDto> RefreshToken(string? refreshToken)
        {
            var userId = _authenticationHelper.ValidateRefreshTokenAndGetUserId(refreshToken);

            var user = await _userData.GetUserById(userId);

            if (user is null)
                throw new Exception("Refresh token is invalid");

            var responseDto = new UserLoginResponseDto();

            responseDto.AccessToken = _authenticationHelper.GenerateAccessToken(user);

            responseDto.RefreshToken = _authenticationHelper.GenerateRefreshToken(user);

            return responseDto;
        }

        public Task<bool> IsEmailAvailable(string email)
        {
            return _userData.IsEmailAvailable(email);
        }

        public Task<bool> IsUsernameAvailable(string username)
        {
            return _userData.IsUsernameAvailable(username);
        }
    }
}
