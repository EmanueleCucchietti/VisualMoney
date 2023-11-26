using AutoMapper;
using DataAccessLayer.Data.CounterParty;
using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.CounterParty;

namespace WebApi.Services.CounterParty
{
    public class CounterPartyService : ICounterPartyService
    {
        private readonly ICounterPartyData _counterPartyData;
        private readonly IMapper _mapper;

        public CounterPartyService(ICounterPartyData counterPartyData, IMapper mapper)
        {
            _counterPartyData = counterPartyData;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CounterPartyResponseDto>> GetCounterParties(int userId)
        {
            var counterPartyModels =  await _counterPartyData.GetCounterParties(userId);

            return _mapper.Map<IEnumerable<CounterPartyResponseDto>>(counterPartyModels);
        }

        public async Task<CounterPartyResponseDto?> GetCounterParty(int id)
        {
            var counterPartyModel = await _counterPartyData.GetCounterParty(id);

            return _mapper.Map<CounterPartyResponseDto>(counterPartyModel);
        }
        
        public async Task<bool> CreateCounterParty(int userId, CounterPartyDto counterPartyDto)
        {
            var counterPartyModel = _mapper.Map<CounterPartyModel>(counterPartyDto);

            counterPartyModel.IdUser = userId;

            return await _counterPartyData.CreateCounterParty(counterPartyModel) == 1;
        }

        public async Task<bool> UpdateCounterParty(int id, CounterPartyDto counterPartyDto, int userId)
        {
            var counterPartyModel = _mapper.Map<CounterPartyModel>(counterPartyDto);

            counterPartyModel.Id = id;

            counterPartyModel.IdUser = userId;

            return await _counterPartyData.UpdateCounterParty(counterPartyModel) == 1;
        }
    }
}
