
namespace Pnut.Models.Popop
{
    public class Player
    {
        public DateTime SpawnTime { get; set; } = DateTime.UtcNow;
        public double ShootingInterval { get; set; } = 1;
        public double AgeInSec { get; set; } = 0;
        public double LastShootTime { get; set; } = 0;
        public string Name { get; set; } = "";
        public View View { get; set; } = new View();
        public Position Position { get; set; } = new Position();
        public double FacingDirection { get; set; } = 0;
        public bool IsShooting { get; set; } = false;
        public double LastSyncAge { get; set; } = 0;
        public double MaxAfKToLogOutInSec { get; set; } = 30;

        public void Shoot(List<Bullet> bullets)
        {
            if (IsShooting && AgeInSec - LastShootTime >= ShootingInterval)
            {
                LastShootTime = AgeInSec;
                bullets.Add(new Bullet
                {
                    FromUserId = Name,
                    MovingAngle = FacingDirection,
                    Speed = 5,
                    Position = new Position
                    {
                        X = Position.X,
                        Y = Position.Y,
                    },
                    Radius = 10
                });
            }
        }
        public void Aging()
        {
            AgeInSec = (DateTime.UtcNow - SpawnTime).TotalSeconds;
        }

        public void Sync(Player playerStatusUpdate)
        {
            if (Name.Equals(playerStatusUpdate.Name))
            {
                LastSyncAge = AgeInSec;
                Position.X = playerStatusUpdate.Position.X;
                Position.Y = playerStatusUpdate.Position.Y;
                FacingDirection = playerStatusUpdate.FacingDirection;
                IsShooting = playerStatusUpdate.IsShooting;
                View = playerStatusUpdate.View;
            }
        }
        public bool IsAfkTooLong()
        {
            return LastSyncAge > MaxAfKToLogOutInSec;
        }
    }
}
