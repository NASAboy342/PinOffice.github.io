using Newtonsoft.Json;

namespace Pnut.Models.Sim1.Request
{
    public class SaveDnaRequest
    {
        public List<Dna> dnas { get; set; }
        public decimal EnergyRecord { get; set; }
        public int AgeInSec { get; set; }
        public decimal FinalEnergy { get; set; }
        public int ReproductionCount { get; set; }
        public bool IsFemale { get; set; }
        public string ColorRGB { get; set; }
    }
}
