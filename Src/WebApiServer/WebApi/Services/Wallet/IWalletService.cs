using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Wallet;

namespace WebApi.Services.Wallet
{
    public interface IWalletService
    {
        Task<bool> CreateWallet(int userId, WalletDto wallet);
        Task<bool> UpdateWallet(WalletWithIdDto wallet, int userId);
        Task<WalletModel?> GetWallet(int walletId);
        Task<IEnumerable<WalletModel>> GetWallets(int userId);
    }
}