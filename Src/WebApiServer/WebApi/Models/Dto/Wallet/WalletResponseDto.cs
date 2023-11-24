namespace WebApi.Models.Dto.Wallet
{
    public class WalletResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
    }
}
