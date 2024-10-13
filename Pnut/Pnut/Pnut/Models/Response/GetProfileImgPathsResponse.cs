namespace Pnut.Models.Response
{
    public class GetProfileImgPathsResponse : BaseResponse
    {
        public List<Img> Imgs { get; set; }
    }

    public class Img
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public bool IsInitByScript { get; set; }
    }
}