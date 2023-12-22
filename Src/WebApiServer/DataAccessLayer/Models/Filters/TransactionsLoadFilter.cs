using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Filters
{
    public class TransactionsLoadFilter
    {
        public int? IdWallet { get; set; } = null;
        public int? IdCategory { get; set; } = null;
        public int? IdCounterParty { get; set; } = null;
        public int? IdTransaction { get; set; } = null;
    }
}
