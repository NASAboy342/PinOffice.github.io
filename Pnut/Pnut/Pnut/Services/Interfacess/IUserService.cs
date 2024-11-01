using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Services.Interfacess
{
    public interface IUserService
    {
        LoginResponse Login(LoginRequest req);
        BaseResponse Register(UserRegisterRequest req);
        SearchUsersResponse SearchUsers(SearchUsersRequest req);
        GetProfileImgPathsResponse GetProfileImgPaths();
        SwichtUserWorkModeResponse SwichtUserWorkMode(SwichtUserWorkModeRequest req);
        GetUsersInfoResponse GetUsersInfo(GetUsersInfoRequest req);
        BaseResponse UpdateProfileInfo(UpdateProfileInfoRequest req);
        SyncAccountInfoResponse SyncAccountInfo(SyncAccountInfoRequest req);
    }
}
