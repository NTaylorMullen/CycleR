using System;
using System.Collections.Generic;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class Matches
    {
        private GameTime _gameTime;
        private MatchManager _matchManager;
        private HighFrequencyTimer _updateLoop;

        public Matches()
        {
            _gameTime = new GameTime();
            _matchManager = new MatchManager();
            _updateLoop = new HighFrequencyTimer(GlobalConfiguration.UPDATE_INTERVAL, id => Update(id));
            _updateLoop.Start();
        }

        public Match Create(IEnumerable<User> players, IGameMode mode)
        {
            return _matchManager.Create(players, mode);
        }

        public void Update(long id)
        {
            _gameTime.Update(DateTime.UtcNow);
            _matchManager.Update(_gameTime);
        }

        private readonly static Lazy<Matches> _instance = new Lazy<Matches>(() => new Matches());
        public static Matches Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}
