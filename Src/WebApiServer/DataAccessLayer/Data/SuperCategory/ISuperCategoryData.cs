using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Category
{
    public interface ISuperCategoryData
    {
        Task<int> CreateCategory(SuperCategoryModel superCategoryModel);
        Task<IEnumerable<SuperCategoryModel>> GetCategories(int idUser);
        Task<SuperCategoryModel?> GetCategory(int id, int idUser);
        Task<int> UpdateCategory(SuperCategoryModel category);
    }
}