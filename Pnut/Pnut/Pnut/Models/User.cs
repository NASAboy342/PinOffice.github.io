using Pnut.Enums;

namespace Pnut.Models
{
    public class User : BaseResponse
    {
        public string? Name { get; set; }
        public int Id { get; set; }
        public int OnlineId { get; set; }
        public EnumUserType EnumUserType { get; set; }
        public string? ProfilePicturePath { get; set; }
        public EnumWorkMode WorkMode { get; set; }
        public string WorkModeAsString { get; set; }

        public void SetWorkModeValue()
        {
            WorkMode = Enum.TryParse(typeof(EnumWorkMode), WorkModeAsString, out object workMode) ? (EnumWorkMode)workMode : EnumWorkMode.Individual;
        }
        public void SetWorkModeAsStringValue()
        {
            WorkModeAsString = WorkMode.ToString();
        }
    }
}
