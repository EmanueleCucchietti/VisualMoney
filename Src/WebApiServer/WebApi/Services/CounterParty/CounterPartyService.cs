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

        public async Task<IEnumerable<CounterPartyModel>> GetCounterParties(int userId)
        {
            try
            {
                return await _counterPartyData.GetCounterParties(userId);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }

        public async Task<CounterPartyModel?> GetCounterParty(int id)
        {
            try
            {
                return await _counterPartyData.GetCounterParty(id);
            }
            catch(Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
        public async Task CreateCounterParty(int userId, CounterPartyDto counterPartyDto)
        {
            try
            {
                var counterPartyModel = _mapper.Map<CounterPartyModel>(counterPartyDto);

                counterPartyModel.IdUser = userId;

                await _counterPartyData.CreateCounterParty(counterPartyModel);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }


        public async Task UpdateCounterParty(CounterPartyWithIdDto counterPartyDto)
        {
            try
            {
                var counterPartyModel = _mapper.Map<CounterPartyModel>(counterPartyDto);

                await _counterPartyData.UpdateCounterParty(counterPartyModel);
            }
            catch (Exception ex)
            {
                // TODO: Log exception

                throw;
            }
        }
    }
}
