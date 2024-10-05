namespace Pnut.Models.Response
{
    public class GetGroupMembersResponse : BaseResponse
    {
        public List<GroupMember> GroupMembers { get; set; }
    }

    public class GroupMember
    {
        public string Img { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Id { get; set; }
        public string Position { get; set; } = string.Empty;
    }
}