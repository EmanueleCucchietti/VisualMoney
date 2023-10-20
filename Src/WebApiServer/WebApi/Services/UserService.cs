using AutoMapper;
using DataAccessLayer.Data;
using DataAccessLayer.Models.Entities;
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

        public async Task Register(UserRegisterDto user)
        {
            try
            {
                var userMapped = _mapper.Map<UserModel>(user);

                userMapped.PasswordSalt = _authenticationHelper.GenerateSalt();

                userMapped.PasswordHash = _authenticationHelper.GeneratePasswordHash(
                    user.Password, userMapped.PasswordSalt);

                await _userData.CreateUserIfNotExists(userMapped);

            }
            catch (Exception e)
            {
                // TODO: Log exception

                throw;
            }
        }
    }
}
