using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class Match : IUpdateable, IDisposable
    {
        private List<User> _players;        
        private IGameMode _mode;
        private Game _game;

        public Match(IEnumerable<User> players, IGameMode mode, long id)
        {
            _players = new List<User>(players);
            _mode = mode;
            ID = id;
            State = MatchState.Ready;
        }

        public long ID { get; private set; }
        public MatchState State { get; private set; }

        private void initializeGame()
        {
            _game = new Game(_players, _mode, gameCompleted);
        }

        private void gameCompleted()
        {
            State = MatchState.Completed;
        }
        
        public void Start()
        {
            if (State == MatchState.Ready)
            {
                initializeGame();
                State = MatchState.Playing;
            }
        }

        public void Update(GameTime gameTime)
        {
            _game.Update(gameTime);
        }

        public void Dispose()
        {           
            _players.Clear();
            _players = null;
            _mode = null;

            _game.Dispose();
            _game = null;
        }
    }
}
