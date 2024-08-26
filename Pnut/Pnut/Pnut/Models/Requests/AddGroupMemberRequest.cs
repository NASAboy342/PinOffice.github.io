using Pnut.Enums;

namespace Pnut.Models.Requests
{
    public class AddGroupMemberRequest
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public EnumGroupPosition UserPosition { get; set; }
        public int InviterUserId { get; set; }
    }
}
