using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class CycleManager : IDisposable
    {
        private ConcurrentDictionary<long, Cycle> _cycles;

        public CycleManager(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;
        }

        public List<Cycle> Cycles()
        {
            return new List<Cycle>(_cycles.Values);
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