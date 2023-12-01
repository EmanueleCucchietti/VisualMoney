using Dapper.Contrib.Extensions;
using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Transaction
{
    public class TransactionData : ITransactionData
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public TransactionData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }
        public async Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int idUser)
        {
            string sql = "spGetTransactions";

            return await _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new
            {
                idUser
            }, useStoredProcedure: true);
        }

        public async Task<TransactionModel?> GetTransactionAsync(int id, int idUser)
        {
            string sql = "spGetTransaction";

            return (await _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, id }, useStoredProcedure: true))
                .FirstOrDefault();
        }

        public async Task<int> AddTransactionAsync(TransactionModel transactionModel)
        {
            string sql = "spCreateTransaction";

            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    transactionModel.Name,
                    transactionModel.Date,
                    transactionModel.Amount,
                    transactionModel.CurrencyCode,
                    transactionModel.IsIncome,
                    transactionModel.IdWallet,
                    transactionModel.IdUser
                },
                useStoredProcedure: true);
        }

        

        public Task<IEnumerable<TransactionModel>> GetTransactionsByCategoryAsync(int idUser, int idCategory)
        {
            string sql = "spGetTransactionsByCategory";

            return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idCategory }, useStoredProcedure: true);
        }

        public Task<IEnumerable<TransactionModel>> GetTransactionsByCounterPartyAsync(int idUser, int idCounterParty)
        {
            string sql = "spGetTransactionsByCounterParty";

            return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idCounterParty }, useStoredProcedure: true);
        }

        public Task<int> AddCategoryToTransactionAsync(int idTransaction, int idCategory, int idUser)
        {
            string sql = "spAddCategoryToTransaction";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    idTransaction,
                    idCategory,
                    idUser
                },
                useStoredProcedure: true);
        }
        
        public Task<int> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int idUser)
        {
            string sql = "spAddCounterPartyToTransaction";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    idTransaction,
                    idCounterParty,
                    idUser
                },
                useStoredProcedure: true);
        }

        public Task<IEnumerable<TransactionModel>> GetTransactionsByWalletAsync(int idUser, int idWallet)
        {
            string sql = "spGetTransactionsByWallet";

            return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idWallet }, useStoredProcedure: true);
        }

        public Task<int> UpdateTransactionAsync(TransactionModel transactionModel)
        {
            string sql = "spUpdateTransaction";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    transactionModel.Id,
                    transactionModel.Name,
                    transactionModel.Date,
                    transactionModel.Amount,
                    transactionModel.CurrencyCode,
                    transactionModel.IsIncome,
                    transactionModel.IdWallet,
                    transactionModel.IdUser
                },
                useStoredProcedure: true);
        }
    }
}
