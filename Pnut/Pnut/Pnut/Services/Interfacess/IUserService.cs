using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Services.Interfacess
{
    public interface IUserService
    {
        LoginResponse Login(LoginRequest req);
        BaseResponse Register(UserRegisterRequest req);
        SwichtUserWorkModeResponse SwichtUserWorkMode(SwichtUserWorkModeRequest req);
    }
}
