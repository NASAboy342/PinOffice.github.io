using Pnut.Enums;
using System.ComponentModel.DataAnnotations;

namespace Pnut.Models.Requests
{
    public class PlaceBetRequest
    {
        public int CustomerId { get; set; }
        public int GameProviderId { get; set; }
        public int GameId { get; set; }
        public int DayBaceOnToday { get; set; }
        public decimal Stake { get; set; }
        [MaxLength(3)] public string? Currency { get; set; }
        public EnumBetStatus Status { get; set; }
    }
}
