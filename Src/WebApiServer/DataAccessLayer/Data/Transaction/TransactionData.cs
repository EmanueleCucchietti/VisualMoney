using Dapper;
using Dapper.Contrib.Extensions;
using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using DataAccessLayer.Models.Filters;
using System.Diagnostics;
using System.Reflection.Metadata.Ecma335;
using System.Transactions;

namespace DataAccessLayer.Data.Transaction
{
    public class TransactionData : ITransactionData
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public TransactionData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }
        public async Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int idUser, bool loadAllData = false)
        {
            string sql = "spGetTransactions";
            if (!loadAllData)
            {
                return await _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new
                {
                    idUser
                }, useStoredProcedure: true);
            }

            return await this.getTransactionsLoadAllDataFilteredAsync(idUser, new());
        }
        
        private async Task<IEnumerable<TransactionModel>> getTransactionsLoadAllDataFilteredAsync(int idUser, TransactionsLoadFilter filters)
        {
            string sql = @"spGetTransactionsLoadAllDataWithFilters";
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
                    param: new { 
                        IdUser = idUser,
                        filters.IdCategory,
                        filters.IdCounterParty,
                        filters.IdWallet,
                        filters.IdTransaction 
                    });
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

        public async Task<TransactionModel?> GetTransactionAsync(int id, int idUser, bool loadAllData)
        {
            if (!loadAllData)
            {
                string sql = "spGetTransaction";

                return (await _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, id }, useStoredProcedure: true))
                    .FirstOrDefault();
            }

            return (await getTransactionsLoadAllDataFilteredAsync(idUser, new() { IdTransaction = id })).FirstOrDefault();
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



        public Task<IEnumerable<TransactionModel>> GetTransactionsByCategoryAsync(int idUser, int idCategory, bool loadAllData = false)
        {
            if (!loadAllData)
            {
                string sql = "spGetTransactionsByCategory";

                return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idCategory }, useStoredProcedure: true);
            }

            return getTransactionsLoadAllDataFilteredAsync(idUser, new() { IdCategory = idCategory});

        }

        public Task<IEnumerable<TransactionModel>> GetTransactionsByCounterPartyAsync(int idUser, int idCounterParty, bool loadAllData = false)
        {
            if (!loadAllData)
            {
                string sql = "spGetTransactionsByCounterParty";

                return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idCounterParty }, useStoredProcedure: true);
            }

            return getTransactionsLoadAllDataFilteredAsync(idUser, new() { IdCounterParty = idCounterParty });
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

        public Task<IEnumerable<TransactionModel>> GetTransactionsByWalletAsync(int idUser, int idWallet, bool loadAllData = false)
        {
            if (!loadAllData)
            {
                string sql = "spGetTransactionsByWallet";

                return _sqlDataAccess.LoadData<TransactionModel, dynamic>(sql, new { idUser, idWallet }, useStoredProcedure: true);
            }

            return getTransactionsLoadAllDataFilteredAsync(idUser, new() { IdWallet = idWallet });
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
