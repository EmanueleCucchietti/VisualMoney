using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data.Category
{
    public class CategoryData : ICategoryData
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public CategoryData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task<int> CreateCategory(CategoryModel categoryModel)
        {
            string sql = @"spCreateCategory";

            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    categoryModel.Name,
                    categoryModel.IdSuperCategory,
                    categoryModel.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<int> UpdateCategory(CategoryModel categoryModel)
        {
            string sql = @"spUpdateCategory";
                
            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    categoryModel.Id,
                    categoryModel.Name,
                    categoryModel.IdSuperCategory,
                    categoryModel.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<IEnumerable<CategoryModel>> GetCategories(int idUser)
        {
            string sql = @"spGetCategories";

            return await _sqlDataAccess.LoadData<CategoryModel, dynamic>(
                sql,
                new { idUser },
                useStoredProcedure: true);
        }

        public async Task<IEnumerable<CategoryModel>> GetCategoriesBySuperCategory(int idSuperCategory, int idUser)
        {
            string sql = @"spGetCategoriesBySuperCategory";

            return await _sqlDataAccess.LoadData<CategoryModel, dynamic>(
                sql,
                new { idUser, idSuperCategory },
                useStoredProcedure: true);
        }

        public async Task<CategoryModel?> GetCategory(int id, int idUser)
        {
            string sql = @"spGetCategory";

            var categories = await _sqlDataAccess.LoadData<CategoryModel, dynamic>(
                sql,
                new { id, idUser },
                useStoredProcedure: true);

            return categories.FirstOrDefault();
        }

        public Task<IEnumerable<CategoryModel>> GetCategoriesByTransaction(int idTransaction, int idUser)
        {
            string sql = @"spGetCategoriesByTransaction";

            return _sqlDataAccess.LoadData<CategoryModel, dynamic>(
                sql,
                new { idTransaction, idUser },
                useStoredProcedure: true);
        }
    }
}
