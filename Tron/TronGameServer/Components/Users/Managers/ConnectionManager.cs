using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tron.Server
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
            _userHandler.AddUser(new User(connectionID));
        }

        public void OnReconnected(string connectionID)
        {
            throw new NotImplementedException();
        }

        public void OnDisconnected(string connectionID)
        {
            _userHandler.RemoveUser(_userHandler.GetUser(connectionID));
        }
    }    
}