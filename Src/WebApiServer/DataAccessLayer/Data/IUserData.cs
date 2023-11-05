﻿using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data
{
    public interface IUserData
    {
        Task CreateUserIfNotExists(UserModel user);
        Task<UserModel?> GetUserByEmailOrUsername(string emailOrUsername);
        Task<UserModel?> GetUserById(int userId);
    }
}