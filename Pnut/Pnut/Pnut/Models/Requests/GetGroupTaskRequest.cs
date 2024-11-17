namespace Pnut.Models.Requests
{
    public class GetGroupTaskRequest
    {
        public int GroupId { get; set; }
        public int SprintId { get; set; }
        public int ScenarioId { get; set; }
        public int UserId { get; set; }
        public int TaskId { get; set; } = 0;
    }
}
