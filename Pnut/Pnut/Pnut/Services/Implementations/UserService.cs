using Pnut.Enums;
using Pnut.Helpers;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IPnutRepository _pnutRepository;
        public UserService(IPnutRepository pnutRepository)
        {
            _pnutRepository = pnutRepository;
        }
        public LoginResponse Login(LoginRequest req)
        {
            req.Password = EncryptHelper.Encrypt5Shifted(req.Password);
            var loginResponse = _pnutRepository.Login(req);
            loginResponse.SetWorkModeValue();
            return new LoginResponse
            {
                User = loginResponse,
                ErrorCode = loginResponse.ErrorCode,
                ErrorMessage = loginResponse.ErrorMessage,
            };
        }

        public BaseResponse Register(UserRegisterRequest req)
        {
            req.Password = EncryptHelper.Encrypt5Shifted(req.Password);

            return _pnutRepository.Register(req);
        }

        public SearchUsersResponse SearchUsers(SearchUsersRequest req)
        {
            var users = _pnutRepository.SearchUsers(req);
            return new SearchUsersResponse
            {
                Users = users
            };
        }

        public GetProfileImgPathsResponse GetProfileImgPaths()
        {
            var imgs = _pnutRepository.GetProfileImgPaths();
            return new GetProfileImgPathsResponse
            {
                Imgs = imgs
            };
        }

        public SwichtUserWorkModeResponse SwichtUserWorkMode(SwichtUserWorkModeRequest req)
        {
            var result = _pnutRepository.SwichtUserWorkMode(req);
            if (result.ErrorCode != ErrorCode.Success)
            {
                return new SwichtUserWorkModeResponse
                {
                    ErrorCode = result.ErrorCode,
                    ErrorMessage = result.ErrorMessage,
                };
            }
                
            return new SwichtUserWorkModeResponse
            {
                WorkMode = req.WorkMode,
                WorkModeAsString = req.WorkMode.ToString(),
                ErrorCode = result.ErrorCode,
                ErrorMessage = result.ErrorMessage,
            };
        }

        public GetUsersInfoResponse GetUsersInfo(GetUsersInfoRequest req)
        {
            return new GetUsersInfoResponse
            {
                User = _pnutRepository.GetUsersInfo(req)
            };
        }

        public BaseResponse UpdateProfileInfo(UpdateProfileInfoRequest req)
        {
            return _pnutRepository.UpdateProfileInfo(req);
        }

        public SyncAccountInfoResponse SyncAccountInfo(SyncAccountInfoRequest req)
        {
            var user = _pnutRepository.GetAccountInfo(req);
            user.SetWorkModeValue();
            return new SyncAccountInfoResponse
            {
                User = user
            };
        }
    }
}
