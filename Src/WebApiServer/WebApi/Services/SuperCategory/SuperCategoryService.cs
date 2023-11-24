using AutoMapper;
using DataAccessLayer.Data.Category;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public class SuperCategoryService : ISuperCategoryService
    {
        private readonly ISuperCategoryData _categoryData;
        private readonly IMapper _mapper;

        public SuperCategoryService(ISuperCategoryData categoryData, IMapper mapper)
        {
            _categoryData = categoryData;
            _mapper = mapper;
        }
        public async Task<bool> CreateCategory(int userId, SuperCategoryDto superCategoryDto)
        {
            try
            {
                var categoryModel = _mapper.Map<SuperCategoryModel>(superCategoryDto);

                categoryModel.IdUser = userId;

                return await _categoryData.CreateCategory(categoryModel) == 1;
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
        public async Task<IEnumerable<SuperCategoryResponseDto>> GetCategories(int userId)
        {
            try
            {
                var categories = await _categoryData.GetCategories(userId);

                return _mapper.Map<IEnumerable<SuperCategoryResponseDto>>(categories);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<SuperCategoryResponseDto?> GetCategory(int id, int userId)
        {
            try
            {
                var category = await _categoryData.GetCategory(id, userId);
                
                return _mapper.Map<SuperCategoryResponseDto>(category);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<bool> UpdateCategory(int id, SuperCategoryDto superCategoryDto, int userId)
        {
            try
            {
                var categoryModel = _mapper.Map<SuperCategoryModel>(superCategoryDto);

                categoryModel.Id = id;

                categoryModel.IdUser = userId;

                return await _categoryData.UpdateCategory(categoryModel) == 1;
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
    }
}
