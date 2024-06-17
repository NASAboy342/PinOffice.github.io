using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;

namespace Pnut.Repositories.Interfacess
{
    public interface IPnutRepository
    {
        public GetTaskResopnse GetTask(GetTaskRequest req);
        BaseResponse SetTasks(SetTasksRequest req);
        BaseResponse UpdateTasks(UpdateTasksRequest req);
    }
}