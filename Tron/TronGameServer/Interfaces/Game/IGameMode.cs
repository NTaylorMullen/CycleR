using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public interface IGameMode
    {
        List<GameSpawn> GetGameSpawns();
        GameConfiguration GetConfiguration();
    }
}
