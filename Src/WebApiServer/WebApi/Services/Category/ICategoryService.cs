using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public interface ICategoryService
    {
        Task<bool> CreateCategory(int userId, CategoryDto categoryDto);
        Task<IEnumerable<CategoryResponseDto>> GetCategories(int userId);
        Task<IEnumerable<CategoryResponseDto>> GetCategoriesBySuperCategory(int idSuperCategory, int userId);
        Task<CategoryResponseDto?> GetCategory(int id, int userId);
        Task<bool> UpdateCategory(int id, CategoryDto categoryDto, int userId);
    }
}