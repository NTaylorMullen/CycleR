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

        public CommandHandler(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;
        }

        public void MovementCommand(User by, MovementFlag direction)
        {
            _cycles[by.ID].RegisterMove(direction);
        }

        public void Dispose()
        {
            _cycles = null;
        }
    }
}
