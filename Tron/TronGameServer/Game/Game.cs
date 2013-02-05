using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace Tron.GameServer
{
    public class Game : IUpdateable, IDisposable
    {
        private Action _onFinish;
        private IGameMode _mode;
        private CycleManager _cycleManager;
        private Map _map;
        private GameConfiguration _gameConfiguration;
        private BroadcastHandler _broadcastHandler;

        public Game(IEnumerable<User> players, IGameMode mode, BroadcastHandler broadcastHandler, Action onFinish)
        {
            _mode = mode;
            _gameConfiguration = _mode.GetConfiguration();
            _broadcastHandler = broadcastHandler;
            _map = new Map(_gameConfiguration.MapConfig);

            var cycleDictionary = createCycles(players);


            _onFinish = onFinish;
            _cycleManager = new CycleManager(cycleDictionary);

            _map.RegisterCycles(cycleDictionary);
            _broadcastHandler.RegisterCycles(cycleDictionary);

            CommandHandler = new CommandHandler(cycleDictionary);
        }

        public CommandHandler CommandHandler { get; private set; }

        private ConcurrentDictionary<long, Cycle> createCycles(IEnumerable<User> players)
        {
            var spawns = _mode.GetGameSpawns();

            IEnumerable<Cycle> cycles = players.Select((user, index) => new Cycle(user.ID, spawns[index].StartPosition, spawns[index].StartVelocity, spawns[index].StartRotation, spawns[index].TrailColor, _map, _gameConfiguration));

            // Convert to Dictionary
            var cycleDictionary = new ConcurrentDictionary<long, Cycle>();
            foreach (Cycle cycle in cycles)
            {
                cycleDictionary.TryAdd(cycle.ID, cycle);
            }

            _mode.FillSpots(cycleDictionary, spawns, _map, _gameConfiguration);

            return cycleDictionary;
        }

        public List<Cycle> CyclesInPlay()
        {
            return _cycleManager.Cycles();
        }

        public void Update(GameTime gameTime)
        {
            _cycleManager.Update(gameTime);
            _map.Update(gameTime);            
        }

        public void Dispose()
        {
            _onFinish = null;
            _mode = null;
            _map.Dispose();
            CommandHandler.Dispose();
            _cycleManager.Dispose();
        }
    }
}