using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Wallet
{
    public interface IWalletData
    {
        Task CreateWallet(WalletModel walletModel);
        Task<WalletModel?> GetWallet(int walletId);
        Task<IEnumerable<WalletModel>> GetWallets(int userId);
        Task UpdateWallet(WalletModel wallet);
    }
}