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
            try
            {
                var walletModel = _mapper.Map<WalletModel>(wallet);

                walletModel.IdUser = userId;

                return await _walletData.CreateWallet(walletModel) == 1;
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<bool> UpdateWallet(WalletWithIdDto wallet, int userId)
        {
            try
            {
                var walletModel = _mapper.Map<WalletModel>(wallet);

                walletModel.IdUser = userId;

                return await _walletData.UpdateWallet(walletModel) == 1;
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<IEnumerable<WalletModel>> GetWallets(int userId)
        {
            try
            {
                return await _walletData.GetWallets(userId);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<WalletModel?> GetWallet(int walletId)
        {
            try
            {
                return await _walletData.GetWallet(walletId);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
    }
}
