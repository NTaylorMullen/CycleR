using System;

namespace CycleR.Game.Server
{
    public class Users : IConnectionHandler
    {
        private UserHandler _userHandler;
        private ConnectionManager _connectionManager;

        public Users()
        {
            _userHandler = new UserHandler();
            _connectionManager = new ConnectionManager(_userHandler);
        }

        public void OnConnected(string connectionID)
        {
            _connectionManager.OnConnected(connectionID);
        }

        public void OnReconnected(string connectionID)
        {
            _connectionManager.OnReconnected(connectionID);
        }

        public void OnDisconnected(string connectionID)
        {
            _connectionManager.OnDisconnected(connectionID);
        }

        public bool UserExists(string connectionID)
        {
            return _userHandler.UserExists(connectionID);
        }

        public User GetUser(string connectionID)
        {
            return _userHandler.GetUser(connectionID);
        }

        private readonly static Lazy<Users> _instance = new Lazy<Users>(() => new Users());
        public static Users Instance
        {
            get
            {
                return _instance.Value;
            }
        }        
    }
}