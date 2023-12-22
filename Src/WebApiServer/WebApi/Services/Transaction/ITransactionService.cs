using WebApi.Models.Dto.Transaction;

namespace WebApi.Services.Transaction
{
    public interface ITransactionService
    {
        Task<bool> AddCategoryToTransactionAsync(int transactionId, int categoryId, int userId);
        Task<bool> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int userId);
        Task<bool> AddTransactionAsync(int userId, TransactionDto transaction);
        Task<bool> DeleteTransactionAsync(int id, int idUser);
        Task<TransactionResponseDto?> GetTransactionAsync(int id, int userId, bool loadAllData = false);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsAsync(int userId, bool loadCategoriesAndCounterParties = false);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCategoryAsync(int idCategory, int idUser, bool loadAllData = false);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCounterPartyAsync(int userId, int counterPartyId, bool loadAllData = false);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByWallet(int userId, int walletId, bool loadAllData = false);
        Task<bool> UpdateTransaction(int id, TransactionDto transaction, int userId);
    }
}