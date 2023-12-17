namespace WebApi.Models.Dto.Transaction
{
    public class TransactionResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
        public DateTime Date { get; set; }
        public bool IsIncome { get; set; }
        public int IdWallet { get; set; }
    }
}
