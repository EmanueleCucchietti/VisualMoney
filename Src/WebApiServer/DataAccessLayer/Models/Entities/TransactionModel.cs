using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class TransactionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
        public bool IsIncome { get; set; }
        public int IdWallet { get; set; }
        public WalletModel? Wallet { get; set; }
        public int IdUser { get; set; }
        public UserModel? User { get; set; }
    }
}
