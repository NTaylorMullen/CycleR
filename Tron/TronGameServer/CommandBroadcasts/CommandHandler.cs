using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class CommandHandler : IDisposable
    {
        // Maps User IDs to cycles
        private ConcurrentDictionary<long, Cycle> _cycles;
        private GameBroadcastHandler _gameBroadcastHandler;
        private GameConfiguration _gameConfiguration;

        public CommandHandler(long matchID, IEnumerable<User> players, IEnumerable<KeyValuePair<long, Cycle>> cycles, GameConfiguration gameConfiguration)
        {
            _cycles = new ConcurrentDictionary<long, Cycle>(cycles);
            _gameBroadcastHandler = new GameBroadcastHandler(matchID, players);
            _gameConfiguration = gameConfiguration;
        }

        public void ConfigureClients()
        {
            _gameBroadcastHandler.BroadcastConfiguration(_gameConfiguration);
        }

        public void MovementCommand(User by, CycleMovementFlag direction)
        {
            var cycle = _cycles[by.ID];
            cycle.Move(direction);
            _gameBroadcastHandler.BroadcastCycle(cycle);
        }

        public void Dispose()
        {
            foreach (var cycle in _cycles.Values)
            {
                cycle.Dispose();
            }
            _cycles.Clear();
            _cycles = null;

            _gameBroadcastHandler.Dispose();
        }
    }
}
