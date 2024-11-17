namespace Pnut.Models.Sim1.Request
{
    public class GetDnaRequest
    {
        public int Generation { get; set; } = 0;
        public bool IsGetAll { get; set; } = true;
    }
}
