using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Transaction
{
    public interface ITransactionData
    {
        Task<int> AddCategoryToTransactionAsync(int transactionId, int categoryId, int userId);
        Task<int> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int userId);
        Task<int> AddTransactionAsync(TransactionModel transactionModel);
        Task<int> DeleteTransactionAsync(int id, int idUser);
        Task<TransactionModel?> GetTransactionAsync(int transactionId, int idUser, bool loadAllData);
        Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int idUser, bool loadAllData = false);
        Task<IEnumerable<TransactionModel>> GetTransactionsByCategoryAsync(int idUser, int idCategory, bool loadAllData = false);
        Task<IEnumerable<TransactionModel>> GetTransactionsByCounterPartyAsync(int idUser, int idCounterParty, bool loadAllData = false);
        Task<IEnumerable<TransactionModel>> GetTransactionsByWalletAsync(int idUser, int idWallet, bool loadAllData = false);
        Task<int> UpdateTransactionAsync(TransactionModel transactionModel);
    }
}