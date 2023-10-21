using Dapper;
using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TestController : Controller
    {
        private readonly ISqlDataAccess _sqlDataAccess;
        private readonly IConfiguration _configuration;

        public TestController(ISqlDataAccess sqlDataAccess, IConfiguration configuration)
        {
            _sqlDataAccess = sqlDataAccess;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            using IDbConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            
            // Get users list, and fill the Wallet collection
            string sql = @"select * from [User] u
                            inner join [Wallet] w on u.Id = w.IdUser";

            var userDictionary = new Dictionary<int, UserModel>();
            var result = await connection.QueryAsync<UserModel, WalletModel, UserModel>(
                sql,
                (user, wallet) =>
                {
                    if (userDictionary.TryGetValue(user.Id, out UserModel existingUser))
                    {
                        user = existingUser;
                    }
                    else
                        userDictionary.Add(user.Id, user);

                    user.Wallets = user.Wallets ?? new List<WalletModel>();
                    user.Wallets.Add(wallet);

                    return user;
                },
                splitOn: "Id"
            );
            var users = userDictionary.Values.ToList();


            // Get Wallets, and fill User property
            string sql2 = @"select * from [User] u
                            inner join [Wallet] w on u.Id = w.IdUser";

            var result2 = await connection.QueryAsync<UserModel, WalletModel, WalletModel>(
                sql,
                (user, wallet) =>
                {
                    user.Wallets = user.Wallets ?? new List<WalletModel>();
                    user.Wallets.Add(wallet);
                    wallet.User = user;
                    return wallet;
                });

            
            return Ok();
        }

        [Authorize(Roles = "Default")]
        [HttpGet("AuthTest")]
        public async Task<IActionResult> AuthTest()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if(identity is null)
                return Unauthorized();

            var userId = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _sqlDataAccess.LoadData<UserModel, dynamic>(
                "select * from [User] where Id = @Id",
                new { Id = userId }
            );

            return Ok(user.FirstOrDefault());
        }

    }
}
