using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public interface ICategoryService
    {
        Task<bool> CreateCategory(int idUser, CategoryDto categoryDto);
        Task<IEnumerable<CategoryResponseDto>> GetCategories(int idUser);
        Task<IEnumerable<CategoryResponseDto>> GetCategoriesBySuperCategory(int idSuperCategory, int idUser);
        Task<CategoryResponseDto?> GetCategory(int id, int idUser);
        Task<IEnumerable<CategoryResponseDto>> GetCategoriesByTransaction(int idTransaction, int idUser);
        Task<bool> UpdateCategory(int id, CategoryDto categoryDto, int idUser);
    }
}