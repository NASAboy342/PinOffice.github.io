using Pnut.Models;
using Pnut.Models.Requests;

namespace Pnut.Services.Interfacess
{
    public interface IFakerService
    {
        public BaseResponse PlaceBet(PlaceBetRequest req);
    }
}
