using System;
namespace Tron.Server
{
    public class Game
    {
        private GameHandler _gameHandler;

        public Game()
        {
            _gameHandler = new GameHandler();
        }

        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        public static Game Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}