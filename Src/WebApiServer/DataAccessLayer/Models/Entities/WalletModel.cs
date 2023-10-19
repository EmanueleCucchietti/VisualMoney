using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class WalletModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
        public int IdUser { get; set; }
        public UserModel? User { get; set; }
        public ICollection<TransactionModel>? Transactions { get; set; }
    }
}
