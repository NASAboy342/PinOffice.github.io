using Newtonsoft.Json;

namespace Pnut.Models
{
    public class ScenarioTask
    {
        public int Id { get; set; }
        public int ScenarioId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string Status { get; set; }
        public string AssignedTo { get; set; } = "[]";
        public List<int> AssingnedUserIds { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public void GetAssingnedUserIds()
        {
            AssingnedUserIds = JsonConvert.DeserializeObject<List<int>>(AssignedTo)?.ToList() ?? new List<int>();
        }
    }
}