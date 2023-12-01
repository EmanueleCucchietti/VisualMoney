using AutoMapper;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.Transaction;

namespace WebApi.Mapping
{
    public class TransactionProfile : Profile
    {
        public TransactionProfile()
        {
            CreateMap<TransactionModel, TransactionDto>();

            CreateMap<TransactionDto, TransactionModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IdUser, opt => opt.Ignore())
                .ForMember(dest => dest.Date, opt => opt.Ignore());

            CreateMap<TransactionModel, TransactionResponseDto>();

            CreateMap<TransactionResponseDto, TransactionModel>()
                .ForMember(dest => dest.IdUser, opt => opt.Ignore())
                .ForMember(dest => dest.Date, opt => opt.Ignore());
        }
    }
}
