using Pnut.Enums;

namespace Pnut.Models.Requests
{
    public class SwichtUserWorkModeRequest
    {
        public int UserId { get; set; }
        public EnumWorkMode WorkMode { get; set; }
    }
}
