using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Wallet
{
    public interface IWalletData
    {
        Task<int> CreateWallet(WalletModel walletModel);
        Task<int> UpdateWallet(WalletModel wallet);
        Task<WalletModel?> GetWallet(int walletId);
        Task<IEnumerable<WalletModel>> GetWallets(int userId);
    }
}