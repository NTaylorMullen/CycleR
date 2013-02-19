using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CycleR.Game.Server
{
    public class MatchLoadingHandler : IDisposable
    {
        private List<long> _playersLoading;
        private Action _loadingComplete;

        public MatchLoadingHandler(IEnumerable<User> players, Action loadingComplete)
        {
            _playersLoading = players.Select(user => user.ID).ToList();
            _loadingComplete = loadingComplete;
        }

        public void UserReady(User user)
        {
            if (_playersLoading.Contains(user.ID))
            {
                _playersLoading.Remove(user.ID);

                if (_playersLoading.Count == 0)
                {
                    _loadingComplete();
                }
            }
        }

        public void Dispose()
        {
            _playersLoading.Clear();
            _playersLoading = null;
            _loadingComplete = null;
        }
    }
}
