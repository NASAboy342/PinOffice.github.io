using Microsoft.AspNetCore.Mvc;
using Pnut.Enums;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Models.Sim1.Request;
using Pnut.Models.Sim1.Response;
using Pnut.Services.Interfacess;

namespace Pnut.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Sim1Controller
    {
        private readonly ISim1Service _sim1Service; 

        public Sim1Controller(ISim1Service sim1Service)
        {
            _sim1Service = sim1Service;
        }

        [HttpPost("save-dna")]
        public BaseResponse SaveDna(SaveDnaRequest req)
        {
            try
            {
                return _sim1Service.SaveDna(req);
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [HttpPost("get-dna")]
        public GetDnaResponse GetDna(GetDnaRequest req)
        {
            try
            {
                return _sim1Service.GetDna(req);
            }
            catch (Exception ex)
            {
                return new GetDnaResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
