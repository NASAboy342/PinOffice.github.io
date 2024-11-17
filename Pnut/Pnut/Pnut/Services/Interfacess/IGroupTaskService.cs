using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Services.Interfacess
{
    public interface IGroupTaskService
    {
        BaseResponse CreateGroupSprint(CreateGroupSprintRequest req);
        GetGroupSprintResponse GetGroupSprint(GetGroupSprintRequest req);
        GetGroupTaskResponse GetGroupTask(GetGroupTaskRequest req);
        GetSprintScenarioResponse GetSprintScenario(GetSprintScenarioRequest req);
    }
}
