using WebApi.Models.Dto.Transaction;
using DataAccessLayer.Data.Transaction;
using DataAccessLayer.Models.Entities;
using AutoMapper;

namespace WebApi.Services.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionData _transactionData;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionData transactionData, IMapper mapper)
        {
            _transactionData = transactionData;
            _mapper = mapper;
        }



        public async Task<TransactionResponseDto?> GetTransactionAsync(int id, int idUser, bool loadAllData = false)
        {
            var transactionModels = await _transactionData.GetTransactionAsync(id, idUser, loadAllData);

            return _mapper.Map<TransactionResponseDto>(transactionModels);
        }
        public async Task<IEnumerable<TransactionResponseDto>> GetTransactionsAsync(int idUser, bool loadAllData = false)
        {
            var transactionModels = await _transactionData.GetTransactionsAsync(idUser, loadAllData);

            return _mapper.Map<IEnumerable<TransactionResponseDto>>(transactionModels);
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCounterPartyAsync(int idUser, int idCounterParty, bool loadAllData = false)
        {
            var transactionModels = await _transactionData.GetTransactionsByCounterPartyAsync(idUser, idCounterParty, loadAllData);

            return _mapper.Map<IEnumerable<TransactionResponseDto>>(transactionModels);
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetTransactionsByWallet(int idUser, int idWallet, bool loadAllData = false)
        {
            var transactionModels = await _transactionData.GetTransactionsByWalletAsync(idUser, idWallet, loadAllData);

            return _mapper.Map<IEnumerable<TransactionResponseDto>>(transactionModels);
        }

        public async Task<bool> AddTransactionAsync(int idUser, TransactionDto transaction)
        {
            var transactionModel = _mapper.Map<TransactionModel>(transaction);

            transactionModel.IdUser = idUser;

            return await _transactionData.AddTransactionAsync(transactionModel) == 2;
        }
        public async Task<bool> UpdateTransaction(int id, TransactionDto transaction, int idUser)
        {
            var transactionModel = _mapper.Map<TransactionModel>(transaction);

            transactionModel.Id = id;
            transactionModel.IdUser = idUser;

            return await _transactionData.UpdateTransactionAsync(transactionModel) == 3;
        }

        public async Task<bool> DeleteTransactionAsync(int id, int idUser)
        {
            return await _transactionData.DeleteTransactionAsync(id, idUser) == 2;
        }



        public async Task<IEnumerable<TransactionResponseDto>> GetTransactionsByCategoryAsync(int idCategory, int idUser, bool loadAllData = false)
        {
            var transactionModels = await _transactionData.GetTransactionsByCategoryAsync(idUser, idCategory, loadAllData);

            return _mapper.Map<IEnumerable<TransactionResponseDto>>(transactionModels);
        }
        public async Task<bool> AddCategoryToTransactionAsync(int idTransaction, int idCategory, int idUser)
        {
            return await _transactionData.AddCategoryToTransactionAsync(idTransaction, idCategory, idUser) == 1;
        }
        
        public async Task<bool> AddCounterPartyToTransactionAsync(int idTransaction, int idCounterParty, int idUser)
        {
            return await _transactionData.AddCounterPartyToTransactionAsync(idTransaction, idCounterParty, idUser) == 1;
        }
    }
}
