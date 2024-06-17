using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Services.Interfacess
{
    public interface ITaskService
    {
        public GetTaskResopnse GetTask(GetTaskRequest req);
        BaseResponse SetTasks(SetTasksRequest req);
        BaseResponse UpdateTasks(UpdateTasksRequest req);
    }
}
