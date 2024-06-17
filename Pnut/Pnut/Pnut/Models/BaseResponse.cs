using Pnut.Enums;

namespace Pnut.Models
{
    public class BaseResponse
    {
        public ErrorCode ErrorCode { get; set; } = ErrorCode.Success;
        public string ErrorMessage { get; set; } = ErrorCode.Success.ToString();
    }
}
