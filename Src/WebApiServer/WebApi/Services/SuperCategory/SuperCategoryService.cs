using AutoMapper;
using DataAccessLayer.Data.Category;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Services.Category
{
    public class SuperCategoryService : ISuperCategoryService
    {
        private readonly ISuperCategoryData _superCategoryData;
        private readonly IMapper _mapper;

        public SuperCategoryService(ISuperCategoryData categoryData, IMapper mapper)
        {
            _superCategoryData = categoryData;
            _mapper = mapper;
        }
        public async Task<bool> CreateCategoryAsync(int userId, SuperCategoryDto superCategoryDto)
        {
            var categoryModel = _mapper.Map<SuperCategoryModel>(superCategoryDto);

            categoryModel.IdUser = userId;

            return await _superCategoryData.CreateSuperCategoryAsync(categoryModel) == 1;
        }
        
        public async Task<IEnumerable<SuperCategoryResponseDto>> GetCategoriesAsync(int userId)
        {
            var categories = await _superCategoryData.GetSuperCategoriesAsync(userId);

            return _mapper.Map<IEnumerable<SuperCategoryResponseDto>>(categories);
        }

        public async Task<SuperCategoryResponseDto?> GetCategoryAsync(int id, int userId)
        {
            var category = await _superCategoryData.GetSuperCategoryAsync(id, userId);
                
            return _mapper.Map<SuperCategoryResponseDto>(category);
        }

        public async Task<bool> UpdateCategoryAsync(int id, SuperCategoryDto superCategoryDto, int userId)
        {
            var categoryModel = _mapper.Map<SuperCategoryModel>(superCategoryDto);

            categoryModel.Id = id;

            categoryModel.IdUser = userId;

            return await _superCategoryData.UpdateSuperCategoryAsync(categoryModel) == 1;
        }
    }
}
