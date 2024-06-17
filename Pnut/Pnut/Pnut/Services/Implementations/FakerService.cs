using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class FakerService : IFakerService
    {
        private readonly IGameProviderRepository _gameProviderRepository;
        public FakerService(IGameProviderRepository gameProviderRepository)
        {
            _gameProviderRepository = gameProviderRepository;
        }
        public BaseResponse PlaceBet(PlaceBetRequest req)
        {
            return _gameProviderRepository.PlaceBet(req);
        }
    }
}
