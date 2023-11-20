using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.CounterParty
{
    public interface ICounterPartyData
    {
        Task<int> CreateCounterParty(CounterPartyModel counterPartyModel);
        Task<IEnumerable<CounterPartyModel>> GetCounterParties(int idUser);
        Task<CounterPartyModel?> GetCounterParty(int counterPartyId);
        Task<int> UpdateCounterParty(CounterPartyModel counterParty);
    }
}