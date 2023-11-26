using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public interface ISuperCategoryService
    {
        Task<bool> CreateCategory(int userId, SuperCategoryDto superCategoryDto);
        Task<IEnumerable<SuperCategoryResponseDto>> GetCategories(int userId);
        Task<SuperCategoryResponseDto?> GetCategory(int id, int userId);
        Task<bool> UpdateCategory(int id, SuperCategoryDto superCategoryDto, int userId);
    }
}