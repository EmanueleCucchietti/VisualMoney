namespace WebApi.Models.Dto.Category
{
    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? IdSuperCategory { get; set; }
    }
}
