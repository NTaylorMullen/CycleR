using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class Match : IUpdateable, IDisposable
    {
        private List<User> _players;        
        private IGameMode _mode;
        private BroadcastHandler _broadcastHandler;
        private MatchLoadingHandler _loadingHandler;

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

            _broadcastHandler = new BroadcastHandler(id, players);
            _loadingHandler = new MatchLoadingHandler(players, initializeGame);
        }

        public long ID { get; private set; }
        public MatchState State { get; private set; }
        public Game Game { get; private set; }

        private void initializeGame()
        {            
            Game = new Game(ID, _players, _mode, _broadcastHandler, gameCompleted);
            _broadcastHandler.BroadcastGameStart(Game.CyclesInPlay());
            State = MatchState.Playing;
        }

        private void gameCompleted()
        {
            State = MatchState.Completed;
        }

        public void UserReady(User user)
        {
            if (State == MatchState.Loading)
            {
                _loadingHandler.UserReady(user);
            }
        }
        
        public void Start()
        {
            if (State == MatchState.Ready)
            {
                _broadcastHandler.BroadcastConfiguration(_mode.GetConfiguration());
                State = MatchState.Loading;
            }
        }

        public void Update(GameTime gameTime)
        {
            if (State == MatchState.Playing)
            {
                Game.Update(gameTime);
            }
        }

        public void Dispose()
        {            
            _players.Clear();
            _players = null;
            _mode = null;

            Game.Dispose();
            Game = null;

            _broadcastHandler.Dispose();
            _loadingHandler.Dispose();

            foreach (User player in _players)
            {
                player.CurrentMatch = this;
            }
        }
    }
}
