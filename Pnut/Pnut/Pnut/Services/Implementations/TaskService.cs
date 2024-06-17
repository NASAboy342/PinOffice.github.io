using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Interfacess;

namespace Pnut.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly IPnutRepository _pnutRepository;

        public TaskService(IPnutRepository pnutRepository)
        {
            _pnutRepository = pnutRepository;
        }

        public GetTaskResopnse GetTask(GetTaskRequest req)
        {
            return _pnutRepository.GetTask(req);
        }

        public BaseResponse SetTasks(SetTasksRequest req)
        {
            return _pnutRepository.SetTasks(req);
        }

        public BaseResponse UpdateTasks(UpdateTasksRequest req)
        {
            return _pnutRepository.UpdateTasks(req);
        }
    }
}