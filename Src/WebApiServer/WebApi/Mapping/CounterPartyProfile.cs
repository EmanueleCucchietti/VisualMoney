using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.CounterParty;

namespace WebApi.Mapping
{
    public class CounterPartyProfile : Profile
    {
        public CounterPartyProfile()
        {
            CreateMap<CounterPartyModel, CounterPartyDto>();
            
            CreateMap<CounterPartyDto, CounterPartyModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());

            CreateMap<CounterPartyModel, CounterPartyResponseDto>();

            CreateMap<CounterPartyResponseDto, CounterPartyModel>()
                .ForMember(dest => dest.IdUser, opt => opt.Ignore());
        }
    }
}
