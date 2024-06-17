using Pnut.Models;
using Pnut.Models.Requests;

namespace Pnut.Repositories.Interfacess
{
    public interface IGameProviderRepository
    {
        public BaseResponse PlaceBet(PlaceBetRequest req);
    }
}
