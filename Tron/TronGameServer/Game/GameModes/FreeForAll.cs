using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Tron.Utilities;
using System.Linq;
using Tron.GameServer.AI;

namespace Tron.GameServer
{
    public class FreeForAll : IGameMode
    {
        private static int _playerCount = 4;
        private static Random _gen = new Random();
        private static GameConfiguration _gameConfiguration = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());

        private GameSpawn[] _spawns = new GameSpawn[_playerCount];

        private long getMaxID(ConcurrentDictionary<long, Cycle> cycles)
        {
            return cycles.OrderByDescending(cycle => cycle.Value.ID).First().Value.ID;
        }

        public FreeForAll()
        {
            double halfMapSize = _gameConfiguration.MapConfig.MAP_SIZE.Width * .5,
                   halfPI = Math.PI / 2;

            _spawns[0] = new GameSpawn
            {
                StartVelocity = new Vector3(_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0),
                StartPosition = new Vector3(-halfMapSize + _gameConfiguration.MapConfig.MAP_START_PADDING, _gameConfiguration.CycleConfig.Y_OFFSET, -halfMapSize + _gameConfiguration.MapConfig.MAP_START_PADDING),
                StartRotation = Math.PI + halfPI,
                TrailColor = 0xff0000
            };

            _spawns[1] = new GameSpawn
            {
                StartVelocity = new Vector3(0, 0, _gameConfiguration.CycleConfig.MAX_SPEED),
                StartPosition = new Vector3(halfMapSize - _gameConfiguration.MapConfig.MAP_START_PADDING, _gameConfiguration.CycleConfig.Y_OFFSET, -halfMapSize + _gameConfiguration.MapConfig.MAP_START_PADDING),
                StartRotation = Math.PI,
                TrailColor = 0x00ff00
            };


            _spawns[2] = new GameSpawn
            {
                StartVelocity = new Vector3(0, 0, -_gameConfiguration.CycleConfig.MAX_SPEED),
                StartPosition = new Vector3(-halfMapSize + _gameConfiguration.MapConfig.MAP_START_PADDING, _gameConfiguration.CycleConfig.Y_OFFSET, halfMapSize - _gameConfiguration.MapConfig.MAP_START_PADDING),
                StartRotation = 0,
                TrailColor = 0x0000ff
            };

            _spawns[3] = new GameSpawn
            {
                StartVelocity = new Vector3(-_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0),
                StartPosition = new Vector3(halfMapSize - _gameConfiguration.MapConfig.MAP_START_PADDING, _gameConfiguration.CycleConfig.Y_OFFSET, halfMapSize - _gameConfiguration.MapConfig.MAP_START_PADDING),
                StartRotation = halfPI,
                TrailColor = 0xffff00
            };
        }

        public List<GameSpawn> GetGameSpawns()
        {
            GameSpawn[] spawnsCopy = new GameSpawn[_playerCount];
            _spawns.CopyTo(spawnsCopy, 0);

            _gen.Shuffle<GameSpawn>(spawnsCopy);

            return new List<GameSpawn>(spawnsCopy);
        }


        public GameConfiguration GetConfiguration()
        {
            return _gameConfiguration;
        }

        public void FillSpots(ConcurrentDictionary<long, Cycle> cycles, List<GameSpawn> spawns, Map map, GameConfiguration gameConfiguration)
        {
            long aiID = getMaxID(cycles) + 1;
            int cycleCount = cycles.Count;

            for (int i = cycleCount; i < _playerCount; i++)
            {
                cycles.TryAdd(aiID, new CycleAI(aiID, spawns[i].StartPosition, spawns[i].StartVelocity, spawns[i].StartRotation, spawns[i].TrailColor, map, gameConfiguration));
                aiID++;
            }
        }
    }
}
