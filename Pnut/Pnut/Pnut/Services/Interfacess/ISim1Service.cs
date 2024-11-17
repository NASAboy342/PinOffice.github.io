using Pnut.Models;
using Pnut.Models.Sim1.Request;
using Pnut.Models.Sim1.Response;

namespace Pnut.Services.Interfacess
{
    public interface ISim1Service
    {
        GetDnaResponse GetDna(GetDnaRequest req);
        BaseResponse SaveDna(SaveDnaRequest req);
    }
}
