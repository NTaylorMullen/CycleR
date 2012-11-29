using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class CycleManager : IDisposable
    {
        private ConcurrentDictionary<long, Cycle> _cycles;

        public CycleManager(IEnumerable<KeyValuePair<long, Cycle>> cycles)
        {
            _cycles = new ConcurrentDictionary<long, Cycle>(cycles);
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                if (cycle.Alive)
                {
                    cycle.Update(gameTime);
                }
            }
        }

        public void Dispose()
        {
            foreach (var cycle in _cycles.Values)
            {
                cycle.Dispose();
            }
            _cycles.Clear();
            _cycles = null;
        }
    }
}