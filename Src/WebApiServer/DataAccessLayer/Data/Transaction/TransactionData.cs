using Dapper;
using Dapper.Contrib.Extensions;
using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System.Reflection.Metadata.Ecma335;

namespace DataAccessLayer.Data.Transaction
{
    public class TransactionData : ITransactionData
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public TransactionData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }
        public async Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int idUser, bool loadCategoriesAndCounterParties = false)
        {
            string sql = "spGetTransactions";
            if (!loadCategoriesAndCounterParties)
            {
                return await _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new
                {
                    idUser
                }, useStoredProcedure: true);
            }


            sql = @"spGetTransactionsWithCategoryAndCounterParties";

            var transactions = await _sqlDataAccess.UseConnection(async (conn) =>
            {
                return await conn.QueryAsync<TransactionModel, CategoryModel, CounterPartyModel, TransactionModel>(sql,
                    (transaction, category, counterpary) =>
                    {
                        transaction.CounterParties.Add(counterpary);
                        transaction.Categories.Add(category);
                        return transaction;
                    },
                    splitOn: "Id, Id",
                    param: new { IdUser = idUser });
            });

            var result = transactions.GroupBy(c => c.Id).Select(g =>
            {
                var gTransaction = g.First();

                // group by and if element is not null add to list
                // distinct by is used since redoundant elements are made up by the join

                gTransaction.Categories = g.Any(t => t.Categories.Single() is not null) ?
                    g.Select(t => t.Categories.Single()).DistinctBy(c => c.Id).ToList() :
                    new();

                gTransaction.CounterParties = g.Any(t => t.CounterParties.Single() is not null) ?
                    g.Select(t => t.CounterParties.Single()).DistinctBy(c => c.Id).ToList() :
                    new();

                return gTransaction;
            });

            return result;
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

        public Task<int> DeleteTransactionAsync(int id, int idUser)
        {
            string sql = "spDeleteTransaction";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    id,
                    idUser
                },
                useStoredProcedure: true);
        }
    }
}
