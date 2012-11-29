using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class MapConfiguration
    {
        public MapConfiguration()
        {
            FLOOR_TILE_SIZE = new Size(100);
            MAP_SIZE = new Size(10000);
            WALL_SIZE = new Size(MAP_SIZE.Width, 2000);
            MAP_START_PADDING = 500;
        }

        public static Size FLOOR_TILE_SIZE { get; private set; }
        public static Size MAP_SIZE { get; private set; }
        public static Size WALL_SIZE { get; private set; }
        public static int MAP_START_PADDING { get; private set; }
    }
}
