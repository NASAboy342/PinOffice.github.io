using Pnut.Enums;
using System.Runtime;

namespace Pnut.Models.Response
{
    public class GetTaskResopnse : BaseResponse
    {
        public List<TaskInfo> Tasks { get; set; }
    }

    public class TaskInfo
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public EnumTaskStatus EnumTaskStatus { get; set; }
        public string? Status => EnumTaskStatus.ToString();
        public int Priority { get; set; }
        public DateTime DueOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifyOn { get; set; }
    }
}