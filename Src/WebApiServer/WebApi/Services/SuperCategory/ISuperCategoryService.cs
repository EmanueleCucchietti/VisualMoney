using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public interface ISuperCategoryService
    {
        Task<bool> CreateCategoryAsync(int userId, SuperCategoryDto superCategoryDto);
        Task<IEnumerable<SuperCategoryResponseDto>> GetCategoriesAsync(int userId);
        Task<SuperCategoryResponseDto?> GetCategoryAsync(int id, int userId);
        Task<bool> UpdateCategoryAsync(int id, SuperCategoryDto superCategoryDto, int userId);
    }
}