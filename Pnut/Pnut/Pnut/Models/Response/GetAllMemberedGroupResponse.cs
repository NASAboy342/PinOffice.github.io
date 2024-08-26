using Pnut.Enums;

namespace Pnut.Models.Response
{
    public class GetAllMemberedGroupResponse : BaseResponse
    {
        public List<MemberedGroup> MemberedGroups { get; set; }
    }

    public class MemberedGroup
    {
        public int GroupId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime JoinOn { get; set; }
        public string Position { get; set; }
    }
}
