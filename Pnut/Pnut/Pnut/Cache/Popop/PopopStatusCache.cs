using Microsoft.AspNetCore.Razor.TagHelpers;
using Pnut.Models.Popop;
using Pnut.Queues.PopopQueues;
using Pnut.Services.Interfacess;
using System.Numerics;
using System.Runtime.Caching;

namespace Pnut.Cache.Popop
{
    public class PopopStatusCache : CacheBase<PopopStatus>
    {
        private readonly string _key = "PopopStatus";
        private readonly PlayerSyncQueue _playerSyncQueue;
        private readonly ILoggerService _loggerService;
        public PopopStatusCache(PlayerSyncQueue playerSyncQueue, ILoggerService loggerService)
        {
            _playerSyncQueue = playerSyncQueue;
            _loggerService = loggerService;
        }
        protected override CacheItemPolicy GetItemPolicy()
        {
            return new CacheItemPolicy()
            {
                SlidingExpiration = TimeSpan.FromMinutes(30)
            };
        }

        protected override async Task<PopopStatus> ReloadFromDb(string key)
        {
            return new PopopStatus();
        }

        public async Task<PopopStatus> GetPopopStatus()
        {
            return await GetAsync(_key);
        }

        public void UpdatePopopStatus(PopopStatus popopStatus)
        {
            AddOrUpdate(_key, popopStatus);
        }

        public async Task Run()
        {
            while (true)
            {
                try
                {
                    if (!Contains(_key))
                    {
                        continue;
                    }
                    var popopStatus = await GetPopopStatus();
                    var playerStatusUpdate = !_playerSyncQueue.IsEmpty() ? _playerSyncQueue.Dequeue() : new Player();
                    popopStatus.Balls.ForEach(b =>
                    {
                        b.MoveInRandomDirection(popopStatus.World);
                        b.Aging();
                    });
                    popopStatus.Players.ForEach(p =>
                    {
                        p.Aging();
                        p.Sync(playerStatusUpdate);
                        p.Shoot(popopStatus.Bullets);
                    });
                    popopStatus.Bullets.ForEach(b =>
                    {
                        b.Move();
                    });
                    popopStatus.Bullets.RemoveAll(b => b.IsHitWorldBorder(popopStatus.World));
                    popopStatus.Players.RemoveAll(p => p.IsAfkTooLong());

                    UpdatePopopStatus(popopStatus);
                    await Task.Delay(11);
                }
                catch(Exception ex)
                {
                    _loggerService.Error($"Update PopopStatus got error: {ex}");
                }
            }
        }
    }
}
