using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class BudgetModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
        public string TimeIntervalType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Repeat { get; set; }
        public short? RepeatInterval { get; set; }
        public int IdUser { get; set; }
        public UserModel? User { get; set; }
    }
}
