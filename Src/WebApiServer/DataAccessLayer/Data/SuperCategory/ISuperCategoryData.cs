using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Category
{
    public interface ISuperCategoryData
    {
        Task<int> CreateSuperCategoryAsync(SuperCategoryModel superCategoryModel);
        Task<IEnumerable<SuperCategoryModel>> GetSuperCategoriesAsync(int idUser);
        Task<SuperCategoryModel?> GetSuperCategoryAsync(int id, int idUser);
        Task<int> UpdateSuperCategoryAsync(SuperCategoryModel category);
    }
}