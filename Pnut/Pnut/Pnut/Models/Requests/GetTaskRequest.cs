using Pnut.Enums;

namespace Pnut.Models.Requests
{
    public class GetTaskRequest
    {
        public int UserId { get; set; }
        public bool IsGetAllStatus { get; set; }
        public EnumTaskStatus Status { get; set; }
        public bool IsGetAllDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
