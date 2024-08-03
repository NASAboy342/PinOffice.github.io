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
    }
}
