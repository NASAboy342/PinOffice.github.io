using Pnut.Enums;

namespace Pnut.Models
{
    public class User
    {
        public string? Name { get; set; }
        public int Id { get; set; }
        public int OnlineId { get; set; }
        public EnumUserType EnumUserType { get; set; }
        public string? ProfilePicturePath { get; set; }
    }
}
