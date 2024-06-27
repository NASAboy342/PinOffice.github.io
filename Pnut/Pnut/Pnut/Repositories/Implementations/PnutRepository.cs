using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Repositories.Interfacess;

namespace Pnut.Repositories.Implementations
{
    public class PnutRepository : BaseRepository, IPnutRepository
    {
        public PnutRepository(IConfiguration configuration) : base(configuration)
        {
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
            }).FirstOrDefault();
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
            }).FirstOrDefault();
        }

        public BaseResponse UpdateTasksDisplayOrder(UpdateTasksDisplayOrderRequest req)
        {
            return GetData<BaseResponse>("[dbo].[Pnut_UpdateTasksDisplayOrder]", new
            {
                tasksDisplayOrder = AsDataTable(req.TaskDisplayOrders)
            }).FirstOrDefault();
        }
    }
}