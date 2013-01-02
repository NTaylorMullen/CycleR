using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class MapConfiguration
    {
        public MapConfiguration()
        {
            FLOOR_TILE_SIZE = new Size(50);
            MAP_SIZE = new Size(10000);
            WALL_SIZE = new Size(MAP_SIZE.Width, 2000);
            MAP_START_PADDING = 500;
        }

        public Size FLOOR_TILE_SIZE { get; protected set; }
        public Size MAP_SIZE { get; protected set; }
        public Size WALL_SIZE { get; protected set; }
        public int MAP_START_PADDING { get; protected set; }
    }
}
