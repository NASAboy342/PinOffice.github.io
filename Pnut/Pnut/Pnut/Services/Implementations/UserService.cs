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

            return new LoginResponse
            {
                User = _pnutRepository.Login(req)
            };
        }

        public BaseResponse Register(UserRegisterRequest req)
        {
            req.Password = EncryptHelper.Encrypt5Shifted(req.Password);

            return _pnutRepository.Register(req);
        }
    }
}
