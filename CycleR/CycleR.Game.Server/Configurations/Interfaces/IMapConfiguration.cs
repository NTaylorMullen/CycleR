using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public interface IMapConfiguration
    {
        Size FLOOR_TILE_SIZE { get; set;}
        Size MAP_SIZE { get; set; }
        Size WALL_SIZE { get; set; }
        int MAP_START_PADDING { get; set; }
    }
}
