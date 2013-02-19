using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CycleR.Game.Server
{
    public class MatchManager : IUpdateable
    {
        private static long _matchIDs = 1;

        private ConcurrentDictionary<long, Match> _matches;

        public MatchManager()
        {
            _matches = new ConcurrentDictionary<long, Match>();
        }

        public Match Create(IEnumerable<User> players, IGameMode mode)
        {
            long matchID = Interlocked.Increment(ref _matchIDs);
            Match match = new Match(players, mode, matchID);
            
            _matches.TryAdd(matchID, match);

            return match;
        }

        public void Update(GameTime gameTime)
        {
            List<long> keysToRemove = new List<long>(_matches.Count);

            Parallel.ForEach(_matches, match =>
            {
                if (match.Value.State != MatchState.Completed)
                {
                    match.Value.Update(gameTime);
                }
                else // Match completed
                {
                    keysToRemove.Add(match.Key);
                }
            });

            for (int i = keysToRemove.Count - 1; i >= 0; i--)
            {
                Match garbage;
                _matches.TryRemove(keysToRemove[i], out garbage);
                garbage.Dispose();
            }
        }
    }
}
