using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Wallet;

namespace WebApi.Services.Wallet
{
    public interface IWalletService
    {
        Task<bool> CreateWallet(int userId, WalletDto wallet);
        Task<bool> UpdateWallet(int id, WalletDto wallet, int userId);
        Task<WalletResponseDto?> GetWallet(int walletId);
        Task<IEnumerable<WalletResponseDto>> GetWallets(int userId);
    }
}