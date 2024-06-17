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
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("get-tasks")]
        public GetTaskResopnse GetTask(GetTaskRequest req)
        {
            return _taskService.GetTask(req);
        }

        [HttpPost("set-tasks")]
        public BaseResponse SetTasks(SetTasksRequest req)
        {
            try
            {
                return _taskService.SetTasks(req);
            }
            catch (Exception ex)
            {
                return new BaseResponse()
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.ToString()
                };
            }
        }

        [HttpPost("update-tasks")]
        public BaseResponse UpdateTasks(UpdateTasksRequest req)
        {
            try
            {
                return _taskService.UpdateTasks(req);
            }
            catch (Exception ex)
            {
                return new BaseResponse()
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.ToString()
                };
            }
        }
    }
}