using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class GroupService : IGroupService
    {
        private readonly IPnutRepository _pnutRepository;
        public GroupService(IPnutRepository pnutRepository)
        {
            _pnutRepository = pnutRepository;
        }

        public BaseResponse AddGroupMember(AddGroupMemberRequest req)
        {
            return _pnutRepository.AddGroupMember(req);
        }

        public BaseResponse CreateGroup(CreateGroupRequest req)
        {
            return _pnutRepository.CreateGroup(req);
        }

        public GetAllMemberedGroupResponse GetAllMemberedGroup(GetAllMemberedGroupRequest req)
        {
            return _pnutRepository.GetAllMemberedGroup(req);
        }
    }
}
