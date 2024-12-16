namespace Pnut.Helpers.Popop
{
    public static class PhysicHelper
    {
        
        public static void Move(double directionInDegree, double speed, double xBefore, double yBefore, out double xAfter, out double yAfter)
        {
            MoveX(directionInDegree, speed, xBefore, out xAfter);
            MoveY(directionInDegree, speed, yBefore, out yAfter);
        }
        public static void MoveX(double directionInDegree, double speed, double xBefore, out double xAfter)
        {
            var radians = directionInDegree * Math.PI / 180;
            xAfter = xBefore + (speed * Math.Cos(radians));
        }
        public static void MoveY(double directionInDegree, double speed, double yBefore, out double yAfter)
        {
            var radians = directionInDegree * Math.PI / 180;
            yAfter = yBefore + (speed * Math.Sin(radians));
        }

        public static void TurnRight(double directionBefore, double angularSpeed, out double directionAfter)
        {
            if (angularSpeed > 360)
            {
                throw new Exception("Angular speed must not be greater than 360");
            }
            directionBefore += angularSpeed;
            if (directionBefore > 360)
            {
                directionBefore -= 360;
            }
            directionAfter = directionBefore;
        }
        public static void TurnLeft(double directionBefore, double angularSpeed, out double directionAfter)
        {
            if (angularSpeed > 360)
            {
                throw new Exception("Angular speed must not be greater than 360");
            }
            directionBefore -= angularSpeed;
            if (directionBefore < 0)
            {
                directionBefore += 360;
            }
            directionAfter = directionBefore;
        }
    }
}
