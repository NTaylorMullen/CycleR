using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public interface IGameMode
    {
        void FillSpots(ConcurrentDictionary<long, Cycle> cycles, List<GameSpawn> spawns, Map map, GameConfiguration gameConfiguration);
        List<GameSpawn> GetGameSpawns();
        GameConfiguration GetConfiguration();
    }
}
