using DataAccessLayer.Models.Entities;

namespace WebApi.Models.Dto.Category
{
    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? IdSuperCategory { get; set; }
        public List<TransactionModel> Transactions { get; set; } = new List<TransactionModel>();
    }
}
