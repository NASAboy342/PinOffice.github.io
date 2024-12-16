using Microsoft.AspNetCore.Razor.TagHelpers;
using Pnut.Models.Popop;
using System.Runtime.Caching;

namespace Pnut.Cache.Popop
{
    public class PopopStatusCache : CacheBase<PopopStatus>
    {
        private readonly string _key = "PopopStatus";
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
                if (!Contains(_key))
                {
                    continue;
                }
                var popopStatus = await GetPopopStatus();
                popopStatus.Balls.ForEach(b =>
                {
                    b.MoveInRandomDirection(popopStatus.World);
                    b.Aging();
                });
                UpdatePopopStatus(popopStatus);
                await Task.Delay(11);
            }
        }
    }
}
