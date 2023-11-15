using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Wallet;

namespace WebApi.Mapping
{
    public class WalletProfile : Profile
    {
        public WalletProfile()
        {
            CreateMap<WalletModel, WalletDto>();

            CreateMap<WalletDto, WalletModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());

            CreateMap<WalletModel, WalletWithIdDto> ();

            CreateMap<WalletWithIdDto, WalletModel>()
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());
        }
    }
}
