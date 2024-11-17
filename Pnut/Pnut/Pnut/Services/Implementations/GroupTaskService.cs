using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class GroupTaskService : IGroupTaskService
    {
        private IPnutRepository _pnutRepository;
        public GroupTaskService(IPnutRepository pnutRepository)
        {
            _pnutRepository = pnutRepository;
        }

        public BaseResponse CreateGroupSprint(CreateGroupSprintRequest req)
        {
            return _pnutRepository.CreateGroupSprint(req);
        }

        public GetGroupSprintResponse GetGroupSprint(GetGroupSprintRequest req)
        {
            var groupSprints = _pnutRepository.GetGroupSprint(req);
            return new GetGroupSprintResponse
            {
                GroupSprints = groupSprints
            };
        }

        public GetGroupTaskResponse GetGroupTask(GetGroupTaskRequest req)
        {
            var tasks = _pnutRepository.GetGroupTask(req);
            tasks.ForEach(t => t.GetAssingnedUserIds());
            return new GetGroupTaskResponse
            {
                ScenarioTasks = tasks,
            };
        }

        public GetSprintScenarioResponse GetSprintScenario(GetSprintScenarioRequest req)
        {
            return new GetSprintScenarioResponse
            {
                Scores = _pnutRepository.GetSprintScenario(req)
            };
        }
    }
}
