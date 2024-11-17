namespace Pnut.Models.Sim1
{
    public class Dna
    {
        public int Id { get; set; } = 0;
        public int Generation { get; set; } = 0;
        public double Value { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
