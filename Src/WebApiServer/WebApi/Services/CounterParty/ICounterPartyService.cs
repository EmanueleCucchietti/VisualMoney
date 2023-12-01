using DataAccessLayer.Models.Entities;
using WebApi.Models.Dto.CounterParty;

namespace WebApi.Services.CounterParty
{
    public interface ICounterPartyService
    {
        Task<bool> CreateCounterParty(int userId, CounterPartyDto counterPartyDto);
        Task<IEnumerable<CounterPartyResponseDto>> GetCounterParties(int userId);
        Task<IEnumerable<CounterPartyResponseDto>> GetCounterPartiesByTransaction(int idTransaction, int idUser);
        Task<CounterPartyResponseDto?> GetCounterParty(int id);
        Task<bool> UpdateCounterParty(int id, CounterPartyDto counterPartyDto, int userId);
    }
}