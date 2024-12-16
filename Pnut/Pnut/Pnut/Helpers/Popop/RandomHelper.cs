namespace Pnut.Helpers.Popop
{
    public class RandomHelper
    {
        public static double GetRandomDouble(double min,  double max)
        {
            return new Random().NextDouble() * ((max - min) + min);
        }
        public static int GetRandomInt(int min, int max)
        {
            return new Random().Next(min, max);
        }
    }
}
