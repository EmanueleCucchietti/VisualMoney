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

        public async Task<int> CreateCounterParty(CounterPartyModel counterPartyModel)
        {
            string sql = @"spCreateCounterParty";

            return await _sqlDataAccess.SaveData(
                sql,
                new
                {
                    counterPartyModel.Name,
                    counterPartyModel.IsHidden,
                    counterPartyModel.IdUser
                },
                useStoredProcedure: true);
        }

        public async Task<int> UpdateCounterParty(CounterPartyModel counterPartyModel)
        {
            string sql = @"spUpdateCounterParty";

            return await _sqlDataAccess.SaveData(
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

        public async Task<IEnumerable<CounterPartyModel>> GetCounterParties(int idUser)
        {
            string sql = @"spGetCounterParties";

            return await _sqlDataAccess.LoadData<CounterPartyModel, dynamic>(
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
    }
}
