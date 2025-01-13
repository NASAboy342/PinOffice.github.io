using Newtonsoft.Json;
using Pnut.Cache.Popop;
using Pnut.Models;
using Pnut.Models.Popop;
using Pnut.Queues.PopopQueues;

namespace Pnut.Services.Popop
{
    public class PopopService : IPopopService
    {
        private readonly PopopStatusCache _popopStatusCache;
        private readonly PlayerSyncQueue _playerSyncQueue;
        public PopopService(PopopStatusCache popopStatusCache, PlayerSyncQueue playerSyncQueue)
        {
            _popopStatusCache = popopStatusCache;
            _playerSyncQueue = playerSyncQueue;
        }

        public async Task AddPlayer(Player player)
        {
            var popopStatus = await _popopStatusCache.GetPopopStatus();
            popopStatus.Players.Add(player);
            _popopStatusCache.UpdatePopopStatus(popopStatus);
        }

        public async Task<PopopStatus> InPutHandler(Player input)
        {
            _playerSyncQueue.Enqueue(input);
            return await _popopStatusCache.GetPopopStatus();
        }

        public async Task<BaseResponse> ResetGame()
        {
            _popopStatusCache.ClearAll();
            return new BaseResponse();
        }

        public async Task<PopopStatus> UpdateHandler()
        {
            return await _popopStatusCache.GetPopopStatus();
        }
    }
}
