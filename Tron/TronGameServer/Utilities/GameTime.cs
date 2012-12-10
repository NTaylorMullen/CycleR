using System;
namespace Tron.GameServer
{
    public class GameTime
    {
        private DateTime _lastUpdated;

        public GameTime()
        {
            _lastUpdated = DateTime.UtcNow;
            Now = _lastUpdated;
            FractionOfSecond = 0;
        }

        public static DateTime LastUpdated { get; private set; }
        public DateTime Now { get; private set; }

        /// <summary>
        /// This is updated on Update to show what percent of a second has passed since the last Update loop.
        /// </summary>
        public double FractionOfSecond { get; set; }
        public TimeSpan Elapsed { get; set; }

        public double CalculateFractionOfSecond(DateTime from)
        {
            return (Now.Subtract(from.ToUniversalTime()).Milliseconds / 1000.0);
        }

        public void Update(DateTime utcNow)
        {
            Now = utcNow;
            FractionOfSecond = CalculateFractionOfSecond(_lastUpdated);

            Elapsed = Now - _lastUpdated;
            _lastUpdated = LastUpdated = Now;
        }
    }
}
