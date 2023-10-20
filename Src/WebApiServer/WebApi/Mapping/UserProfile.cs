using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.User;

namespace WebApi.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRegisterDto, UserModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore());
            
            CreateMap<UserModel, UserRegisterDto>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());
        }
    }
}
