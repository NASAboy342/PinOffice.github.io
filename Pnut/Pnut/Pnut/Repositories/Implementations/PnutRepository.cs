using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Models.Sim1;
using Pnut.Models.Sim1.Request;
using Pnut.Repositories.Interfacess;

namespace Pnut.Repositories.Implementations
{
    public class PnutRepository : BaseRepository, IPnutRepository
    {
        public PnutRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public BaseResponse AddGroupMember(AddGroupMemberRequest req)
        {
            return GetData<BaseResponse>("[Pnut_AddGroupMember]", new
            {
                req.GroupId,
                req.UserId,
                userPosition = req.UserPosition.ToString(),
                req.InviterUserId
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse CreateGroup(CreateGroupRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_CreateGroup]", new
            {
                req.GroupName,
                req.GroupDescription,
                req.CreatorUserId
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse CreateGroupSprint(CreateGroupSprintRequest req)
        {
            throw new NotImplementedException();
        }

        public User GetAccountInfo(SyncAccountInfoRequest req)
        {
            return GetData<User>("[dbo].[Pnut_GetAccountInfo]", new
            {
                req.UserId
            }).FirstOrDefault() ?? new User();
        }

        public GetAllMemberedGroupResponse GetAllMemberedGroup(GetAllMemberedGroupRequest req)
        {
            var groups = GetData<MemberedGroup>("[dbo].[Pnut_GetAllGroup]", new
            {
                req.UserId
            }).ToList();

            return new GetAllMemberedGroupResponse
            {
                MemberedGroups = groups
            };
        }

        public GetGroupMembersResponse GetGroupMembers(GetGroupMembersRequest req)
        {
            var members = GetData<GroupMember>("[dbo].[Pnut_GetGroupMembers]", new
            {
                req.GroupId
            }).ToList();

            return new GetGroupMembersResponse
            {
                GroupMembers = members
            };
        }

        public List<GroupSprint> GetGroupSprint(GetGroupSprintRequest req)
        {
            return GetData<GroupSprint>("[dbo].[Pnut_GetGroupSprint]", new
            {
                req.GroupId,
                req.UserId
            }).ToList();
        }

        public List<ScenarioTask> GetGroupTask(GetGroupTaskRequest req)
        {
            return GetData<ScenarioTask>("[dbo].[Pnut_GetGroupTask]", new
            {
                req.GroupId,
                req.UserId,
                req.SprintId,
                req.ScenarioId,
                req.TaskId,
            }).ToList();
        }

        public List<Img> GetProfileImgPaths()
        {
            return GetData<Img>("[dbo].[Pnut_GetProfileImgPaths]", null).ToList();
        }

        public List<SprintScenario> GetSprintScenario(GetSprintScenarioRequest req)
        {
            return GetData<SprintScenario>("[dbo].[Pnut_GetSprintScenario]", new
            {
                req.SprintId,
                req.UserId
            }).ToList();
        }

        public GetTaskResopnse GetTask(GetTaskRequest req)
        {
            var tasks = GetData<TaskInfo>("[dbo].[Pnut_GetTask]", new
            {
                req.UserId,
                req.IsGetAllStatus,
                req.Status,
                req.IsGetAllDate,
                req.StartDate,
                req.EndDate
            }).ToList();

            return new GetTaskResopnse
            {
                Tasks = tasks
            };
        }

        public User GetUsersInfo(GetUsersInfoRequest req)
        {
            return GetData<User>("[dbo].[Pnut_GetUsersInfo]", new
            {
                req.Id
            }).FirstOrDefault() ?? new User();
        }

        public User Login(LoginRequest req)
        {
            return GetData<User>("[dbo].[Pnut_Login]", new
            {
                req.UserName,
                req.Password
            }).FirstOrDefault() ?? new User();
        }

        public BaseResponse Register(UserRegisterRequest req)
        {
            return GetData<LoginResponse>("[dbo].[Pnut_Register]", new
            {
                req.UserName,
                req.Password
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public List<User> SearchUsers(SearchUsersRequest req)
        {
            return GetData<User>("[dbo].[Pnut_SearchUsers]", new
            {
                req.UserName,
                req.Id
            }).ToList();
        }

        public BaseResponse SetTasks(SetTasksRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_SetTasks]", new
            {
                req.UserId,
                req.Title,
                req.Description,
                req.Status,
                req.Priority,
                req.CreatedOn,
                req.DueOn,
                req.ModifyOn
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public List<Dna> Sim1GetDna(GetDnaRequest req)
        {
            return GetData<Dna>("[dbo].[Pnut_Sim1GetDna]" , new
            {
                req.IsGetAll,
                req.Generation,
            }).ToList();
        }

        public BaseResponse Sim1SaveDna(SaveDnaRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_Sim1SaveDna]", new
            {
                dna = AsDataTable(req.dnas),
                req.EnergyRecord,
                req.AgeInSec,
                req.FinalEnergy,
                req.ReproductionCount,
                req.IsFemale,
                req.ColorRGB,
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse SwichtUserWorkMode(SwichtUserWorkModeRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_SwichtUserWorkMode]", new
            {
                req.UserId,
                workMode = req.WorkMode.ToString()
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse UpdateProfileInfo(UpdateProfileInfoRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_UpdateProfileInfo]", new
            {
                id = req.Id,
                name = req.Username,
                profilePicturePath = req.ProfileImgPath
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse UpdateTasks(UpdateTasksRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_UpdateTasks]", new
            {
                req.Userid,
                req.Id,
                req.Title,
                req.Description,
                req.EnumTaskStatus,
                req.DueOn,
                req.ModifyOn
            }).FirstOrDefault() ?? new BaseResponse();
        }

        public BaseResponse UpdateTasksDisplayOrder(UpdateTasksDisplayOrderRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_UpdateTasksDisplayOrder]", new
            {
                tasksDisplayOrder = AsDataTable(req.TaskDisplayOrders)
            }).FirstOrDefault() ?? new BaseResponse();
        }
    }
}