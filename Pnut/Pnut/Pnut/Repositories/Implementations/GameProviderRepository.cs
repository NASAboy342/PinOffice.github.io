using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Repositories.Interfacess;

namespace Pnut.Repositories.Implementations
{
    public class GameProviderRepository : BaseWLRepository, IGameProviderRepository
    {
        public override string ConnectionString()
        {
            return "Server=.;Database=GameProvider;User=sa;Password=1234qwer;";
        }
        public BaseResponse PlaceBet(PlaceBetRequest req)
        {
            return GetData<BaseResponse>("[dbo].[faker_placeBet]", new
            {
                req.CustomerId,
                req.GameProviderId,
                req.GameId,
                req.DayBaceOnToday,
                req.Stake,
                req.Currency,
                Status = req.Status.ToString(),
            }).FirstOrDefault();
        }
    }
}
