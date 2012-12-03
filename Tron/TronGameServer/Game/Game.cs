using System;
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

        public Game(long matchID, IEnumerable<User> players, IGameMode mode, BroadcastHandler broadcastHandler, Action onFinish)
        {
            _mode = mode;
            _gameConfiguration = _mode.GetConfiguration();

            var cycles = createCycles(players);
            _onFinish = onFinish;
            _cycleManager = new CycleManager(cycles);
            _map = new Map(cycles, _gameConfiguration.MapConfig);
            CommandHandler = new CommandHandler(matchID, players, cycles, broadcastHandler, _gameConfiguration);
        }

        public CommandHandler CommandHandler { get; private set; }

        private IEnumerable<KeyValuePair<long, Cycle>> createCycles(IEnumerable<User> players)
        {
            var spawns = _mode.GetGameSpawns();

            return players.Select((user, index) => new KeyValuePair<long, Cycle>(user.ID, new Cycle(user.ID, spawns[index].StartPosition, spawns[index].StartVelocity, spawns[index].StartRotation, spawns[index].TrailColor, _gameConfiguration.MapConfig)));
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