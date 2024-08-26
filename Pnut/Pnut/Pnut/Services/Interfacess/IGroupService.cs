using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Services.Interfacess
{
    public interface IGroupService
    {
        BaseResponse AddGroupMember(AddGroupMemberRequest req);
        BaseResponse CreateGroup(CreateGroupRequest req);
        GetAllMemberedGroupResponse GetAllMemberedGroup(GetAllMemberedGroupRequest req);
    }
}
