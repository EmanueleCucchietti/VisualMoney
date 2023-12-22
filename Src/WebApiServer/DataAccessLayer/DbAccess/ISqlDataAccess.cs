using System.Data;

namespace DataAccessLayer.DbAccess
{
    public interface ISqlDataAccess
    {
        Task<IEnumerable<T>> LoadData<T, U>(string sqlStatement, U parameters, string connectionStringName = "DefaultConnection", bool useStoredProcedure = false);
        Task<int> SaveData<T>(string sqlStatement, T parameters, string connectionStringName = "DefaultConnection", bool useStoredProcedure = false);
        Task<T> UseConnection<T>(Func<IDbConnection, Task<T>> getData, string connectionStringName = "DefaultConnection");
    }
}