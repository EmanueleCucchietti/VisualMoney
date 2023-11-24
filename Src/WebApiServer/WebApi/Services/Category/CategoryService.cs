using AutoMapper;
using DataAccessLayer.Data.Category;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryData _categoryData;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryData categoryData, IMapper mapper)
        {
            _categoryData = categoryData;
            _mapper = mapper;
        }

        public async Task<bool> CreateCategory(int userId, CategoryDto categoryDto)
        {
            try
            {
                var categoryModel = _mapper.Map<CategoryModel>(categoryDto);

                categoryModel.IdUser = userId;

                return await _categoryData.CreateCategory(categoryModel) == 1;
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
        public async Task<IEnumerable<CategoryResponseDto>> GetCategories(int userId)
        {
            try
            {
                var categories = await _categoryData.GetCategories(userId);

                return _mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<CategoryResponseDto?> GetCategory(int id, int userId)
        {
            try
            {
                var category = await _categoryData.GetCategory(id, userId);
                
                return _mapper.Map<CategoryResponseDto>(category);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<IEnumerable<CategoryResponseDto>> GetCategoriesBySuperCategory(int idSuperCategory, int userId)
        {
            try
            {
                var categories = await _categoryData.GetCategoriesBySuperCategory(idSuperCategory, userId);

                return _mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<bool> UpdateCategory(int id, CategoryDto categoryDto, int userId)
        {
            try
            {
                var categoryModel = _mapper.Map<CategoryModel>(categoryDto);

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
