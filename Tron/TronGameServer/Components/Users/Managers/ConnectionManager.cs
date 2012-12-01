using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tron.GameServer
{
    public class ConnectionManager : IConnectionHandler
    {
        private UserHandler _userHandler;

        public ConnectionManager(UserHandler userHandler)
        {
            _userHandler = userHandler;
        }

        public void OnConnected(string connectionID)
        {
            _userHandler.CreateUser(connectionID);
        }

        public void OnReconnected(string connectionID)
        {
            _userHandler.RemoveUser(connectionID);
        }

        public void OnDisconnected(string connectionID)
        {
            _userHandler.RemoveUser(connectionID);
        }
    }    
}