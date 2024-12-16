using Microsoft.AspNetCore.Mvc;
using Pnut.Models;
using Pnut.Models.Popop;
using Pnut.Services.Interfacess;
using Pnut.Services.Popop;
using Pnut.WebsocketHelpers;
using System.Net.WebSockets;
using System.Text;

namespace Pnut.Controllers.Popop
{
    public class GameWsController: ControllerBase
    {
        private readonly IPopopService _popopService;
        public GameWsController(IPopopService popopService)
        {
            _popopService = popopService;
        }

        [HttpGet("/synce-game")]
        public async Task<IActionResult> SynceGame()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocketServer = new WebSocketServer(await HttpContext.WebSockets.AcceptWebSocketAsync());
                await webSocketServer.ListenerTask<Player, PopopStatus>(_popopService.InPutHandler, _popopService.UpdateHandler);
                return new EmptyResult();
            }
            else
            {
                return BadRequest("This endpoint requires a WebSocket connection.");
            }
        }

        [HttpPost("add-player")]
        public async Task<BaseResponse> AddPlayer([FromBody] Player player)
        {
            await _popopService.AddPlayer(player);
            return new BaseResponse();
        }
    }
}
