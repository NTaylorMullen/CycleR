using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class CycleConfiguration
    {
        public CycleConfiguration()
        {
            BASE_CYCLE_SCALE = new Vector3(2.68648, 2.60262, 1.750692);
            SCALE = new Vector3(37.22342991572615, 40, 35);
            SIZE = new Vector2(200, 100);
            Y_OFFSET = 35;
            MAX_SPEED = 1000;
        }

        public Vector3 BASE_CYCLE_SCALE { get; protected set; }
        public Vector3 SCALE { get; protected set; }
        public Vector2 SIZE { get; protected set; }
        public int Y_OFFSET { get; protected set; }
        public int MAX_SPEED { get; protected set; }
    }
}
