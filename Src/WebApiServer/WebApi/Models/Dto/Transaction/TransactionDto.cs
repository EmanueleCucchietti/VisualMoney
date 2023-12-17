using DataAccessLayer.Models.Entities;

namespace WebApi.Models.Dto.Transaction
{
    public class TransactionDto
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
        public DateTime Date { get; set; }
        public bool IsIncome { get; set; }
        public int IdWallet { get; set; }
    }
}
