using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data
{
    public interface IUserData
    {
        Task CreateUserIfNotExists(UserModel user);
    }
}