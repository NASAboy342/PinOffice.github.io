using Microsoft.AspNetCore.Mvc;
using Pnut.Enums;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Services.Interfacess;

namespace Pnut.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupTaskController : ControllerBase
    {
        private IGroupTaskService _groupTaskService;
        public GroupTaskController(IGroupTaskService groupTaskService)
        {
            _groupTaskService = groupTaskService;
        }

        [HttpPost("get-group-task")]
        public GetGroupTaskResponse GetGroupTask(GetGroupTaskRequest req)
        {
            try
            {
                return _groupTaskService.GetGroupTask(req);
            }
            catch (Exception ex)
            {
                return new GetGroupTaskResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [HttpPost("get-group-sprint")]
        public GetGroupSprintResponse GetGroupSprint(GetGroupSprintRequest req)
        {
            try
            {
                return _groupTaskService.GetGroupSprint(req);
            }
            catch (Exception ex)
            {
                return new GetGroupSprintResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [HttpPost("create-group-sprint")]
        public BaseResponse CreateGroupSprint(CreateGroupSprintRequest req)
        {
            try
            {
                return _groupTaskService.CreateGroupSprint(req);
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [HttpPost("get-sprint-scenario")]
        public GetSprintScenarioResponse GetSprintScenario(GetSprintScenarioRequest req)
        {
            try
            {
                return _groupTaskService.GetSprintScenario(req);
            }
            catch (Exception ex)
            {
                return new GetSprintScenarioResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
