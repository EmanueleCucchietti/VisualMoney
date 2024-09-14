using Dapper;
using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

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

        public async Task<IEnumerable<CategoryModel>> GetCategories(int idUser, bool loadAllData)
        {
            string sql = @"spGetCategories";

            if (!loadAllData)
            {
                return await _sqlDataAccess.LoadData<CategoryModel, dynamic>(
                    sql,
                    new { idUser },
                    useStoredProcedure: true);
            }

            return await getCategoriesAllData(idUser);
        }

        private async Task<IEnumerable<CategoryModel>> getCategoriesAllData(int idUser)
        {
            string sql = @"spGetCategoriesLoadAllData";

            var categories = await _sqlDataAccess.UseConnection(async conn =>
            {
                return await conn.QueryAsync<CategoryModel, TransactionModel, CategoryModel>(sql,
                    (category, transaction) =>
                    {
                        category.Transactions.Add(transaction);
                        return category;
                    },
                    splitOn: "Id",
                    param: new { IdUser = idUser }
                );
            });

            var result = categories.GroupBy(c => c.Id).Select(g =>
            {
                var gCategory = g.First();

                // group by and if element is not null add to list
                // distinct by is used since redoundant elements are made up by the join

                gCategory.Transactions = g.Any(t => t.Transactions.Single() is not null) ?
                    g.Select(t => t.Transactions.Single()).DistinctBy(c => c.Id).ToList() :
                    new();

                return gCategory;
            });

            return result;
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
