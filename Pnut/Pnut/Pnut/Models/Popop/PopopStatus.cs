using Pnut.Helpers.Popop;

namespace Pnut.Models.Popop
{
    public class PopopStatus
    {
        public PopopStatus()
        {
            World = new PopopWorld
            {
                Height = 1000,
                Weight = 1500
            };
            Balls = new List<PopopBall> 
            {
                new PopopBall
                {
                    Radius = 10,
                    Position = new Position
                    {
                        X = (new Random().NextDouble() * (World.Weight - 0d) + 0d),
                        Y = (new Random().NextDouble() * (World.Height - 0d) + 0d)
                    }
                },
                new PopopBall
                {
                    Radius = 10,
                    Position = new Position
                    {
                        X = (new Random().NextDouble() * (World.Weight - 0d) + 0d),
                        Y = (new Random().NextDouble() * (World.Height - 0d) + 0d)
                    }
                },
                new PopopBall
                {
                    Radius = 10,
                    Position = new Position
                    {
                        X = (new Random().NextDouble() * (World.Weight - 0d) + 0d),
                        Y = (new Random().NextDouble() * (World.Height - 0d) + 0d)
                    }
                }
            };
        }
        public PopopWorld World { get; set; }
        public List<PopopBall> Balls { get; set; } = [];
        public List<Player> Players { get; set; } = [];
        public List<Bullet> Bullets { get; set; } = [];
    }
}
