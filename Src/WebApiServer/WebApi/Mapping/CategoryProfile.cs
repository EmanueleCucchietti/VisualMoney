using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoryModel, CategoryDto>();

            CreateMap<CategoryDto, CategoryModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());

            CreateMap<CategoryModel, CategoryResponseDto>();

            CreateMap<CategoryResponseDto, CategoryModel>()
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());
        }
    }
}
