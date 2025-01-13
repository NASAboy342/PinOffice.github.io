using Pnut.Helpers.Popop;

namespace Pnut.Models.Popop
{
    public class Bullet
    {
        public Position Position { get; set; } = new Position();
        public double MovingAngle { get; set; } = 0.0;
        public double Speed { get; set; } = 4;
        public double Radius { get; set; } = 10;
        public string FromUserId { get; set; } = "";
        public void Move()
        {
            PhysicHelper.Move(MovingAngle, Speed, Position.X, Position.Y, out var xAfter, out var yAfter);
            Position.X = xAfter;
            Position.Y = yAfter;
        }

        public bool IsHitWorldBorder(PopopWorld world)
        {
            return Position.X >= world.Weight || Position.X <= 0 || Position.Y >= world.Height || Position.Y <= 0;
        }
    }
}