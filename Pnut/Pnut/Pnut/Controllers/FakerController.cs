using Microsoft.AspNetCore.Mvc;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Services.Interfacess;

namespace Pnut.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FakerController : ControllerBase
    {
        private readonly IFakerService _fakerService;
        public FakerController(IFakerService fakerService)
        {
            _fakerService = fakerService;
        }
        [HttpPost("place-bet")]
        public BaseResponse PlaceBet(PlaceBetRequest req)
        {
            return _fakerService.PlaceBet(req);
        }
    }
}
