using AutoMapper;
using DataAccessLayer.Data.Wallet;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Wallet;

namespace WebApi.Services.Wallet
{
    public class WalletService : IWalletService
    {
        private readonly IWalletData _walletData;
        private readonly IMapper _mapper;

        public WalletService(IWalletData walletData,
                             IMapper mapper)
        {
            _walletData = walletData;
            _mapper = mapper;
        }

        public async Task<bool> CreateWallet(int userId, WalletDto wallet)
        {
            var walletModel = _mapper.Map<WalletModel>(wallet);

            walletModel.IdUser = userId;

            return await _walletData.CreateWallet(walletModel) == 1;
        }

        public async Task<bool> UpdateWallet(int id, WalletDto wallet, int userId)
        {
            var walletModel = _mapper.Map<WalletModel>(wallet);

            walletModel.Id = id;

            walletModel.IdUser = userId;

            return await _walletData.UpdateWallet(walletModel) == 1;
        }

        public async Task<IEnumerable<WalletResponseDto>> GetWallets(int userId)
        {
            var walletModels =  await _walletData.GetWallets(userId);

            return _mapper.Map<IEnumerable<WalletResponseDto>>(walletModels);
        }

        public async Task<WalletResponseDto?> GetWallet(int walletId, int userId)
        {
            var walletModel =  await _walletData.GetWallet(walletId, userId);

            return _mapper.Map<WalletResponseDto>(walletModel);
        }
    }
}
