using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.Category
{
    public interface ICategoryData
    {
        Task<int> CreateCategory(CategoryModel categoryModel);
        Task<IEnumerable<CategoryModel>> GetCategories(int idUser);
        Task<IEnumerable<CategoryModel>> GetCategoriesBySuperCategory(int idSuperCategory, int idUser);
        Task<IEnumerable<CategoryModel>> GetCategoriesByTransaction(int idTransaction, int idUser);
        Task<CategoryModel?> GetCategory(int id, int idUser);
        Task<int> UpdateCategory(CategoryModel category);
    }
}