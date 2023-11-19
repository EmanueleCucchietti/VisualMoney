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

        public async Task CreateWallet(int userId, WalletDto wallet)
        {
            try
            {
                var walletModel = _mapper.Map<WalletModel>(wallet);

                walletModel.IdUser = userId;

                await _walletData.CreateWallet(walletModel);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task UpdateWallet(WalletWithIdDto wallet, int userId)
        {
            try
            {
                var walletModel = _mapper.Map<WalletModel>(wallet);

                walletModel.IdUser = userId;

                await _walletData.UpdateWallet(walletModel);
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
