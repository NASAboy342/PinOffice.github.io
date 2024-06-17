using Pnut.Enums;

namespace Pnut.Models.Requests
{
    public class SetTasksRequest
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public EnumTaskStatus Status { get; set; } = EnumTaskStatus.Todo;
        public int Priority { get; set; } = 1;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime DueOn { get; set; } = DateTime.Now.AddDays(1);
        public DateTime ModifyOn { get; set; } = DateTime.Now;
    }
}
