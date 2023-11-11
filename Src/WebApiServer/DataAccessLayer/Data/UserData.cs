using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class UserData : IUserData
    {
        public readonly ISqlDataAccess _sqlDataAccess;

        public UserData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task CreateUserIfNotExists(UserModel user)
        {
            string sqlTestExistence = @"spCheckUserExistence";

            var existentUsers = await _sqlDataAccess.LoadData<UserModel, dynamic>(sqlTestExistence, new { user.Email, user.Username }, useStoredProcedure: true);

            if (existentUsers.Any())
                throw new Exception("User already exists");

            string sqlCreateUser = @"spCreateUser";

            user.Email = user.Email.ToLower();

            await _sqlDataAccess.SaveData(sqlCreateUser, new
            {
                user.Username,
                user.Email,
                user.Name,
                user.Surname,
                user.PasswordHash,
                user.PasswordSalt,
                Role = user.Role ?? "Default"
            }, useStoredProcedure: true);
        }

        public async Task<UserModel?> GetUserByEmailOrUsername(string emailOrUsername)
        {
            string sql = @"spGetUserByEmailOrUsername";

            return (await _sqlDataAccess.LoadData<UserModel, dynamic>
                (sql, new { emailOrUsername }, useStoredProcedure: true)).FirstOrDefault();
        }

        public async Task<UserModel?> GetUserById(int userId)
        {
            string sql = @"spGetUserById";

            return (await _sqlDataAccess.LoadData<UserModel, dynamic>(
                sql,
                new { Id = userId },
                useStoredProcedure: true)).FirstOrDefault();
        }

        public async Task<bool> IsEmailAvailable(string email)
        {
            string sql = @"spIsEmailAvailable";

            return (await _sqlDataAccess.LoadData<bool, dynamic>(
                sql,
                new { Email = email.ToLower() },
                useStoredProcedure: true)
            ).FirstOrDefault();
        }

        public async Task<bool> IsUsernameAvailable(string username)
        {
            string sql = @"spIsUsernameAvailable";

            return (await _sqlDataAccess.LoadData<bool, dynamic>(
                sql,
                new { username },
                useStoredProcedure: true)
            ).FirstOrDefault();
        }
    }
}
