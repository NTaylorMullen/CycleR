using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class Match : IUpdateable, IDisposable
    {
        private List<User> _players;        
        private IGameMode _mode;

        public Match(IEnumerable<User> players, IGameMode mode, long id)
        {
            _players = new List<User>(players);
            _mode = mode;
            ID = id;
            State = MatchState.Ready;

            foreach (User player in _players)
            {
                player.CurrentMatch = this;
            }
        }

        public long ID { get; private set; }
        public MatchState State { get; private set; }
        public Game Game { get; private set; }

        private void initializeGame()
        {
            Game = new Game(ID, _players, _mode, gameCompleted);
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
            Game.Update(gameTime);
        }

        public void Dispose()
        {           
            _players.Clear();
            _players = null;
            _mode = null;

            Game.Dispose();
            Game = null;

            foreach (User player in _players)
            {
                player.CurrentMatch = this;
            }
        }
    }
}
