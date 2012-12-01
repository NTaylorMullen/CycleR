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

        public Game(long matchID, IEnumerable<User> players, IGameMode mode, Action onFinish)
        {
            var cycles = createCycles(players);

            _mode = mode;
            _onFinish = onFinish;
            _cycleManager = new CycleManager(cycles);
            _map = new Map(cycles);
            CommandHandler = new CommandHandler(matchID, players, cycles, _mode.GetConfiguration());
        }

        public CommandHandler CommandHandler { get; private set; }

        private IEnumerable<KeyValuePair<long, Cycle>> createCycles(IEnumerable<User> players)
        {
            var spawns = _mode.GetGameSpawns();

            return players.Select((user, index) => new KeyValuePair<long, Cycle>(user.ID, new Cycle(user.ID, spawns[index].StartPosition, spawns[index].StartVelocity, spawns[index].StartRotation)));
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