using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Wallet;

namespace WebApi.Services.Wallet
{
    public interface IWalletService
    {
        Task CreateWallet(int userId, WalletDto wallet);
        Task<WalletModel?> GetWallet(int walletId);
        Task<IEnumerable<WalletModel>> GetWallets(int userId);
        Task UpdateWallet(WalletWithIdDto wallet);
    }
}