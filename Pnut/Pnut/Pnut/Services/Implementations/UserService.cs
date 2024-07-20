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
    }
}
