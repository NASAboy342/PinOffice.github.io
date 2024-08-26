using Pnut.Enums;
using System.ComponentModel.DataAnnotations;

namespace Pnut.Models.Requests
{
    public class SearchUsersRequest
    {
        public string UserName { get; set; }
        public bool IsById => int.TryParse(UserName, out int id);

        public bool IsValidRequest(out BaseResponse errorResponse)
        {
            if(UserName.Length > 100)
            {
                errorResponse = new BaseResponse
                {
                    ErrorCode = ErrorCode.UserNameIsTooLong,
                    ErrorMessage = "UserName cannot be longer then 100 charactors"
                };
                return false;
            }
            errorResponse = new BaseResponse();
            return true;
        }
    }
}
