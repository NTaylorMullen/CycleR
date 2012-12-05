using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
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

        private IHubContext getConnectionContext()
        {
            return GlobalHost.ConnectionManager.GetHubContext<ConnectionHub>();
        }

        public void OnConnected(string connectionID)
        {
            getConnectionContext().Clients.Client(connectionID).successfulConnection(_userHandler.CreateUser(connectionID).ID);
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