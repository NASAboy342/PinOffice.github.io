namespace Pnut.Models.Requests
{
    public class UpdateProfileInfoRequest
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? ProfileImgPath { get; set; }
    }
}
