using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
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

        public Game(long matchID, IEnumerable<User> players, IGameMode mode, BroadcastHandler broadcastHandler, Action onFinish)
        {
            _mode = mode;
            _gameConfiguration = _mode.GetConfiguration();
            _broadcastHandler = broadcastHandler;

            var cycles = createCycles(players);
            var cycleDictionary = new ConcurrentDictionary<long, Cycle>();
            foreach (Cycle cycle in cycles)
            {
                cycleDictionary.TryAdd(cycle.ID, cycle);
            }

            _onFinish = onFinish;
            _cycleManager = new CycleManager(cycleDictionary);
            _map = new Map(cycleDictionary, _gameConfiguration.MapConfig);
            CommandHandler = new CommandHandler(matchID, players, cycleDictionary, broadcastHandler, _gameConfiguration);            
        }

        public CommandHandler CommandHandler { get; private set; }

        private IEnumerable<Cycle> createCycles(IEnumerable<User> players)
        {
            var spawns = _mode.GetGameSpawns();

            return players.Select((user, index) => new Cycle(user.ID, spawns[index].StartPosition, spawns[index].StartVelocity, spawns[index].StartRotation, spawns[index].TrailColor, _gameConfiguration.MapConfig,_broadcastHandler.BroadcastMovement));
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
            _cycleManager.Dispose();
            _map.Dispose();
        }
    }
}