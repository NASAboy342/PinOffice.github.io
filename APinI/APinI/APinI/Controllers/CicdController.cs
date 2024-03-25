using APinI.Models;
using APinI.Services;
using Microsoft.AspNetCore.Mvc;

namespace APinI.Controllers
{
    [ApiController]
    [Route("api/CicdController")]
    public class CicdController : ControllerBase
    {
        private readonly ICicdService _cicdService;
        public CicdController(ICicdService cicdService)
        {
            _cicdService = cicdService;
        }

        [HttpPost("update-website")]
        public async Task<UpdateWebsiteResponse> UpdateWebsite()
        {
            return await _cicdService.UpdateWebsite();
        }

        [HttpPost("HackWifi")]
        public async Task<string> HackWifi(Wifi req)
        {
            WifiCrackingService wifiCrackingService = new WifiCrackingService();
            return await wifiCrackingService.ProccessHacking(req);
        }
    }
}
