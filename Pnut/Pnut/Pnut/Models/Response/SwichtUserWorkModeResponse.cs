using Pnut.Enums;

namespace Pnut.Models.Response
{
    public class SwichtUserWorkModeResponse: BaseResponse
    {
        public EnumWorkMode WorkMode { get; set; }
        public string WorkModeAsString { get; set; }
    }
}
