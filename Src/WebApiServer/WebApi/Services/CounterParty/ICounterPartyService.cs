using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.CounterParty;

namespace WebApi.Services.CounterParty
{
    public interface ICounterPartyService
    {
        Task<bool> CreateCounterParty(int userId, CounterPartyDto counterPartyDto);
        Task<IEnumerable<CounterPartyModel>> GetCounterParties(int userId);
        Task<CounterPartyModel?> GetCounterParty(int id);
        Task<bool> UpdateCounterParty(CounterPartyWithIdDto counterPartyDto, int userId);
    }
}