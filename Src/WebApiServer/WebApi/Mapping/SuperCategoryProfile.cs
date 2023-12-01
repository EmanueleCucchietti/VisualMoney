using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Category;

namespace WebApi.Mapping
{
    public class SuperCategoryProfile : Profile
    {
        public SuperCategoryProfile()
        {
            CreateMap<SuperCategoryModel, SuperCategoryDto>();

            CreateMap<SuperCategoryDto, SuperCategoryModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());

            CreateMap<SuperCategoryModel, SuperCategoryResponseDto>();

            CreateMap<SuperCategoryResponseDto, SuperCategoryModel>()
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());
        }
    }
}
