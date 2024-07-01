using Pnut.Enums;
using System;
using System.Runtime;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        public EnumDatelineCloseLevel enumDatelineCloseLevel => GetDetelineLevel(DueOn, CreatedOn);
        public int Priority { get; set; }
        public DateTime DueOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifyOn { get; set; }
        private EnumDatelineCloseLevel GetDetelineLevel(DateTime dueOn, DateTime createOn)
        {
            var plannedDuration = dueOn - createOn;
            var currentDurationLeft = dueOn - DateTime.Now;
            var timePercentageleft = Math.Round((currentDurationLeft * 100) / plannedDuration);

            if (timePercentageleft < 20)
                return EnumDatelineCloseLevel.CloseDateline;
            else if (timePercentageleft < 50)
                return EnumDatelineCloseLevel.HalfTheTime;
            else
                return EnumDatelineCloseLevel.Normal;
        }
    }
}