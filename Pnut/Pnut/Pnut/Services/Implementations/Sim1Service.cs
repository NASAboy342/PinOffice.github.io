using Pnut.Models;
using Pnut.Models.Sim1.Request;
using Pnut.Models.Sim1.Response;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class Sim1Service : ISim1Service
    {
        private readonly IPnutRepository _pnutRepository;

        public Sim1Service(IPnutRepository pnutRepository)
        {
            _pnutRepository = pnutRepository;
        }

        public GetDnaResponse GetDna(GetDnaRequest req)
        {
            return new GetDnaResponse
            {
                Dnas = _pnutRepository.Sim1GetDna(req)
            };
        }

        public BaseResponse SaveDna(SaveDnaRequest req)
        {
            return _pnutRepository.Sim1SaveDna(req);
        }
    }
}
