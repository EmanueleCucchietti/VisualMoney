using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.CounterParty
{
    public interface ICounterPartyData
    {
        Task CreateCounterParty(CounterPartyModel counterPartyModel);
        Task<IEnumerable<CounterPartyModel>> GetCounterParties(int idUser);
        Task<CounterPartyModel?> GetCounterParty(int counterPartyId);
        Task UpdateCounterParty(CounterPartyModel counterParty);
    }
}