using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class CounterpartyTransaction
    {
        public int Id { get; set; }
        public int IdCounterparty { get; set; }
        public int IdTransaction { get; set; }
    }
}
