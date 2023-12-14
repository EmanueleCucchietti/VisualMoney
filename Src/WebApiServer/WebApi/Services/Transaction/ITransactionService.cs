using WebApi.Models.Dto.Transaction;

namespace WebApi.Services.Transaction
{
    public interface ITransactionService
    {
        Task<bool> AddCategoryToTransactionAsync(int transactionId, int categoryId, int userId);
        Task<bool> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int userId);
        Task<bool> AddTransactionAsync(int userId, TransactionDto transaction);
        Task<bool> DeleteTransactionAsync(int id, int idUser);
        Task<TransactionResponseDto?> GetTransactionAsync(int id, int userId);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsAsync(int userId);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCategoryAsync(int idCategory, int idUser);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCounterPartyAsync(int userId, int counterPartyId);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionsByWallet(int userId, int walletId);
        Task<bool> UpdateTransaction(int id, TransactionDto transaction, int userId);
    }
}