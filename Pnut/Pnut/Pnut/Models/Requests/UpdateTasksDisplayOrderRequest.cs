namespace Pnut.Models.Requests
{
    public class UpdateTasksDisplayOrderRequest
    {
        public List<TaskDisplayOrder> TaskDisplayOrders { get; set; }
    }

    public class TaskDisplayOrder
    {
        public int TaskId { get; set; }
        public int Priority { get; set; }
    }
}