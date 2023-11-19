using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data.Wallet
{
    public class WalletData : IWalletData
    {
        public readonly ISqlDataAccess _sqlDataAccess;

        public WalletData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task CreateWallet(WalletModel walletModel)
        {
            string sql = @"spCreateWallet";

            await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    walletModel.IdUser,
                    walletModel.Name,
                    walletModel.CurrencyCode,
                    walletModel.Amount
                },
                useStoredProcedure: true);
        }

        public async Task UpdateWallet(WalletModel wallet)
        {
            string sql = @"spUpdateWallet";

            await _sqlDataAccess.SaveData(
                sql,
                new 
                { 
                    wallet.Id,
                    wallet.Name,
                    wallet.CurrencyCode,
                    wallet.Amount,
                    wallet.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<IEnumerable<WalletModel>> GetWallets(int idUser)
        {
            string sql = @"spGetWallets";

            return await _sqlDataAccess.LoadData<WalletModel, dynamic>(sql, new { idUser }, useStoredProcedure: true);
        }

        public async Task<WalletModel?> GetWallet(int walletId)
        {
            string sql = @"spGetWallet";

            return (await _sqlDataAccess.LoadData<WalletModel, dynamic>(sql, new { walletId }, useStoredProcedure: true)).FirstOrDefault();
        }

    }
}
