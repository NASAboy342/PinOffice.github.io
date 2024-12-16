namespace Pnut.Models.Popop
{
    public class Player
    {
        public string Name { get; set; } = "";
        public View View { get; set; } = new View();
        public Position Position { get; set; } = new Position();
    }
}
