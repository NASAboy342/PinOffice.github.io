using Pnut.Enums;

namespace Pnut.Models.Requests
{
    public class UpdateTasksRequest
    {
        public int Userid { get; set; }
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public EnumTaskStatus EnumTaskStatus { get; set; }
        public DateTime DueOn { get; set; }
        public DateTime ModifyOn => DateTime.Now;
    }
}
