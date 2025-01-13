using Pnut.Models;
using Pnut.Models.Popop;

namespace Pnut.Services.Popop
{
    public interface IPopopService
    {
        Task AddPlayer(Player player);
        Task<PopopStatus> InPutHandler(Player input);
        Task<BaseResponse> ResetGame();
        Task<PopopStatus> UpdateHandler();
    }
}
