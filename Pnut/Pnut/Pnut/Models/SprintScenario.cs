namespace Pnut.Models
{
    public class SprintScenario
    {
        public int Id { get; set; }
        public int SprintId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}