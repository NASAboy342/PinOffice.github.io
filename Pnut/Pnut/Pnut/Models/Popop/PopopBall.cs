using Pnut.Helpers.Popop;

namespace Pnut.Models.Popop
{
    public class PopopBall
    {
        public int Radius { get; set; }
        public Position Position { get; set; } = new Position();
        public double Speed { get; set; } = 1d;
        public double Direction { get; set; } = RandomHelper.GetRandomDouble(0d, 360d);
        public double AngularSpeed { get; set; } = 20d;
        public DateTime SpawnTime { get; set; } = DateTime.Now;
        public TimeSpan LiveSpan { get; set; } = TimeSpan.FromSeconds(0);
        public TimeSpan DirectionChangeIntervol { get; set; } = TimeSpan.FromMilliseconds(100);
        public TimeSpan LastTimeDirectionChange { get; set; } = TimeSpan.FromSeconds(1);
        public void Move(PopopWorld world)
        {
            PhysicHelper.Move(Direction, Speed, Position.X, Position.Y, out var xAfter, out var yAfter);
            var isReachBoundaryX = xAfter > world.Weight || xAfter < 1;
            if (!isReachBoundaryX)
            {
                Position.X = xAfter;
            }
            var isReachBoundaryY = yAfter > world.Height || yAfter < 1;
            if (!isReachBoundaryY)
            {
                Position.Y = yAfter;
            }
        }
        public void TurnRight(double engle)
        {
            PhysicHelper.TurnRight(Direction, AngularSpeed, out var directionAfter);
            Direction = directionAfter;
        }
        public void TurnLeft(double engle)
        {
            PhysicHelper.TurnLeft(Direction, AngularSpeed, out var directionAfter);
            Direction = directionAfter;
        }

        public void MoveInRandomDirection(PopopWorld world)
        {
            if(IsShouldChangeDirection(out var isTurnRight))
            {
                if (isTurnRight)
                {
                    TurnRight(AngularSpeed);
                }
                else
                {
                    TurnLeft(AngularSpeed);
                }
            }
            
            Move(world);
        }

        private bool IsShouldChangeDirection(out bool isTurnRight)
        {
            if (LastTimeDirectionChange + DirectionChangeIntervol <= LiveSpan)
            {
                LastTimeDirectionChange = LiveSpan;
                isTurnRight = new Random().Next(1, 10) > 4;
                return true;
            }
            isTurnRight = true;
            return false;
        }

        public void Aging()
        {
            LiveSpan = DateTime.Now - SpawnTime;
        }
    }
}
