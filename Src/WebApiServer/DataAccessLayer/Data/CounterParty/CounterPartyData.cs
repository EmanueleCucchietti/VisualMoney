using DataAccessLayer.DbAccess;
using DataAccessLayer.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data.CounterParty
{
    public class CounterPartyData : ICounterPartyData
    {
        public readonly ISqlDataAccess _sqlDataAccess;

        public CounterPartyData(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public Task<int> CreateCounterParty(CounterPartyModel counterPartyModel)
        {
            string sql = @"spCreateCounterParty";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    counterPartyModel.Name,
                    counterPartyModel.IsHidden,
                    counterPartyModel.IdUser
                },
                useStoredProcedure: true);
        }

        public Task<int> UpdateCounterParty(CounterPartyModel counterPartyModel)
        {
            string sql = @"spUpdateCounterParty";

            return _sqlDataAccess.SaveData(
                sql,
                new
                {
                    counterPartyModel.Id,
                    counterPartyModel.Name,
                    counterPartyModel.IsHidden,
                    counterPartyModel.IdUser
                },
                useStoredProcedure: true);
        }

        public Task<IEnumerable<CounterPartyModel>> GetCounterParties(int idUser)
        {
            string sql = @"spGetCounterParties";

            return _sqlDataAccess.LoadData<CounterPartyModel, dynamic>(
                sql,
                new { idUser },
                useStoredProcedure: true);
        }

        public async Task<CounterPartyModel?> GetCounterParty(int counterPartyId)
        {
            string sql = @"spGetCounterParty";

            var counterParties = await _sqlDataAccess.LoadData<CounterPartyModel, dynamic>(sql, new { counterPartyId }, useStoredProcedure: true);

            return counterParties.FirstOrDefault();
        }

        public Task<IEnumerable<CounterPartyModel>> GetCounterPartiesByTransaction(int idTransaction, int idUser)
        {
            string sql = @"spGetCounterPartiesByTransaction";

            return _sqlDataAccess.LoadData<CounterPartyModel, dynamic>(
                sql,
                new { idTransaction, idUser },
                useStoredProcedure: true);
        }
    }
}
