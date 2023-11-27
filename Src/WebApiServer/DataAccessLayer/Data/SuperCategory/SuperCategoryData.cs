using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data.Category
{
    public class SuperCategoryData : ISuperCategoryData
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public SuperCategoryData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task<int> CreateSuperCategoryAsync(SuperCategoryModel superCategoryModel)
        {
            string sql = @"spCreateSuperCategory";

            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    superCategoryModel.Name,
                    superCategoryModel.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<int> UpdateSuperCategoryAsync(SuperCategoryModel superCategoryModel)
        {
            string sql = @"spUpdateSuperCategory";
                
            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    superCategoryModel.Id,
                    superCategoryModel.Name,
                    superCategoryModel.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<IEnumerable<SuperCategoryModel>> GetSuperCategoriesAsync(int idUser)
        {
            string sql = @"spGetSuperCategories";

            return await _sqlDataAccess.LoadData<SuperCategoryModel, dynamic>(
                sql,
                new { idUser },
                useStoredProcedure: true);
        }

        public async Task<SuperCategoryModel?> GetSuperCategoryAsync(int id, int idUser)
        {
            string sql = @"spGetSuperCategory";

            var categories = await _sqlDataAccess.LoadData<SuperCategoryModel, dynamic>(
                sql,
                new { id, idUser },
                useStoredProcedure: true);

            return categories.FirstOrDefault();
        }
    }
}
