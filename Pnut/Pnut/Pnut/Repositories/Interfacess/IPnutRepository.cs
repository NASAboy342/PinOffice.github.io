using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Models.Sim1;
using Pnut.Models.Sim1.Request;

namespace Pnut.Repositories.Interfacess
{
    public interface IPnutRepository
    {
        BaseResponse AddGroupMember(AddGroupMemberRequest req);
        BaseResponse CreateGroup(CreateGroupRequest req);
        GetAllMemberedGroupResponse GetAllMemberedGroup(GetAllMemberedGroupRequest req);
        GetGroupMembersResponse GetGroupMembers(GetGroupMembersRequest req);
        List<Img> GetProfileImgPaths();
        public GetTaskResopnse GetTask(GetTaskRequest req);
        User GetUsersInfo(GetUsersInfoRequest req);
        User Login(LoginRequest req);
        BaseResponse Register(UserRegisterRequest req);
        List<User> SearchUsers(SearchUsersRequest req);
        BaseResponse SetTasks(SetTasksRequest req);
        BaseResponse SwichtUserWorkMode(SwichtUserWorkModeRequest req);
        User GetAccountInfo(SyncAccountInfoRequest req);
        BaseResponse UpdateProfileInfo(UpdateProfileInfoRequest req);
        BaseResponse UpdateTasks(UpdateTasksRequest req);
        BaseResponse UpdateTasksDisplayOrder(UpdateTasksDisplayOrderRequest req);
        List<ScenarioTask> GetGroupTask(GetGroupTaskRequest req);
        List<GroupSprint> GetGroupSprint(GetGroupSprintRequest req);
        List<SprintScenario> GetSprintScenario(GetSprintScenarioRequest req);
        BaseResponse CreateGroupSprint(CreateGroupSprintRequest req);
        BaseResponse Sim1SaveDna(SaveDnaRequest req);
        List<Dna> Sim1GetDna(GetDnaRequest req);
    }
}