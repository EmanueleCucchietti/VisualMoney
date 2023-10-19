using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DbAccess
{
    public class SqlDataAccess : ISqlDataAccess
    {
        private readonly IConfiguration _configuration;
        public SqlDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<T>> LoadData<T, U>(
            string sqlStatement,
            U parameters,
            string connectionStringName = "DefaultConnection",
            bool useStoredProcedure = false)
        {

            using IDbConnection connection = new SqlConnection(_configuration.GetConnectionString(connectionStringName));

            return await connection.QueryAsync<T>(
                sqlStatement,
                parameters,
                commandType: (useStoredProcedure) ? CommandType.StoredProcedure : CommandType.Text);
        }

        public async Task SaveData<T>(
            string sqlStatement,
            T parameters,
            string connectionStringName = "DefaultConnection",
            bool useStoredProcedure = false)
        {

            using IDbConnection connection = new SqlConnection(_configuration.GetConnectionString(connectionStringName));

            await connection.ExecuteAsync(
                sqlStatement,
                parameters,
                commandType: (useStoredProcedure) ? CommandType.StoredProcedure : CommandType.Text);
        }
    }
}
