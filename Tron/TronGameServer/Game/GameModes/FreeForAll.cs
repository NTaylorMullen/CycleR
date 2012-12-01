using System;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class FreeForAll : IGameMode
    {
        private static int _playerCount = 4;
        private static Random _gen = new Random();
        private static GameConfiguration _gameConfiguration = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());

        private GameSpawn[] _spawns = new GameSpawn[_playerCount];

        public FreeForAll()
        {
            double halfMapSize = MapConfiguration.MAP_SIZE.Width * .5,
                   halfPI = Math.PI / 2;

            _spawns[0] = new GameSpawn
            {
                StartVelocity = new Vector3(CycleConfiguration.MAX_SPEED, 0, 0),
                StartPosition = new Vector3(-halfMapSize + MapConfiguration.MAP_START_PADDING, CycleConfiguration.Y_OFFSET, -halfMapSize + MapConfiguration.MAP_START_PADDING),
                StartRotation = 0
            };

            _spawns[1] = new GameSpawn
            {
                StartVelocity = new Vector3(0, 0, -CycleConfiguration.MAX_SPEED),
                StartPosition = new Vector3(halfMapSize - MapConfiguration.MAP_START_PADDING, CycleConfiguration.Y_OFFSET, -halfMapSize + MapConfiguration.MAP_START_PADDING),
                StartRotation = -halfPI
            };


            _spawns[2] = new GameSpawn
            {
                StartVelocity = new Vector3(0, 0, -CycleConfiguration.MAX_SPEED),
                StartPosition = new Vector3(-halfMapSize + MapConfiguration.MAP_START_PADDING, CycleConfiguration.Y_OFFSET, halfMapSize - MapConfiguration.MAP_START_PADDING),
                StartRotation = halfPI
            };

            _spawns[3] = new GameSpawn
            {
                StartVelocity = new Vector3(-CycleConfiguration.MAX_SPEED, 0, 0),
                StartPosition = new Vector3(halfMapSize - MapConfiguration.MAP_START_PADDING, CycleConfiguration.Y_OFFSET, halfMapSize - MapConfiguration.MAP_START_PADDING),
                StartRotation = Math.PI
            };
        }

        public List<GameSpawn> GetGameSpawns()
        {
            GameSpawn[] spawnsCopy = new GameSpawn[_playerCount];
            _spawns.CopyTo(spawnsCopy,0);

            _gen.Shuffle<GameSpawn>(spawnsCopy);

            return new List<GameSpawn>(spawnsCopy);
        }


        public GameConfiguration GetConfiguration()
        {
            return _gameConfiguration;
        }
    }
}
