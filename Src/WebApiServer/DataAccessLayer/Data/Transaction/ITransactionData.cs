﻿using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Transaction
{
    public interface ITransactionData
    {
        Task<int> AddCategoryToTransactionAsync(int transactionId, int categoryId, int userId);
        Task<int> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int userId);
        Task<int> AddTransactionAsync(TransactionModel transactionModel);
        Task<TransactionModel?> GetTransactionAsync(int transactionId, int idUser);
        Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int idUser);
        Task<IEnumerable<TransactionModel>> GetTransactionsByCategoryAsync(int idUser, int idCategory);
        Task<IEnumerable<TransactionModel>> GetTransactionsByCounterPartyAsync(int idUser, int idCounterParty);
        Task<IEnumerable<TransactionModel>> GetTransactionsByWalletAsync(int idUser, int idWallet);
        Task<int> UpdateTransactionAsync(TransactionModel transactionModel);
    }
}