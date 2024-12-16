using Newtonsoft.Json;
using Pnut.Cache.Popop;
using Pnut.Models.Popop;

namespace Pnut.Services.Popop
{
    public class PopopService : IPopopService
    {
        private readonly PopopStatusCache _popopStatusCache;
        public PopopService(PopopStatusCache popopStatusCache)
        {
            _popopStatusCache = popopStatusCache;
        }

        public async Task AddPlayer(Player player)
        {
            var popopStatus = await _popopStatusCache.GetPopopStatus();
            popopStatus.Players.Add(player);
            _popopStatusCache.UpdatePopopStatus(popopStatus);
        }

        public async Task<PopopStatus> InPutHandler(Player input)
        {
            Console.WriteLine(JsonConvert.SerializeObject(input));
            var popopStatus = await _popopStatusCache.GetPopopStatus();
            foreach (var player in popopStatus.Players)
            {
                if (player.Name.Equals(input.Name))
                {
                    player.Position.X = input.Position.X;
                    player.Position.Y = input.Position.Y;
                }
            }
            _popopStatusCache.UpdatePopopStatus(popopStatus);
            return await _popopStatusCache.GetPopopStatus();
        }

        public async Task<PopopStatus> UpdateHandler()
        {
            return await _popopStatusCache.GetPopopStatus();
        }
    }
}
