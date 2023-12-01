using DataAccessLayer.Models.Entities;

namespace DataAccessLayer.Data.CounterParty
{
    public interface ICounterPartyData
    {
        Task<int> CreateCounterParty(CounterPartyModel counterPartyModel);
        Task<IEnumerable<CounterPartyModel>> GetCounterParties(int idUser);
        Task<IEnumerable<CounterPartyModel>> GetCounterPartiesByTransaction(int idTransaction, int idUser);
        Task<CounterPartyModel?> GetCounterParty(int counterPartyId);
        Task<int> UpdateCounterParty(CounterPartyModel counterParty);
    }
}