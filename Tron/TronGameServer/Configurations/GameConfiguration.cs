using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tron.GameServer
{
    public class GameConfiguration
    {
        public GameConfiguration(CycleConfiguration cycleConfig, MapConfiguration mapConfig)
        {
            CycleConfig = cycleConfig;
            MapConfig = mapConfig;
        }

        public CycleConfiguration CycleConfig { get; private set; }
        public MapConfiguration MapConfig { get; private set; }
    }
}