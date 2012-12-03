using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    [HubName("ConnectionHub")]
    public class ConnectionHub : Hub
    {
        private readonly Users _users;

        public ConnectionHub() : this(Users.Instance) { }

        public ConnectionHub(Users users)
        {
            _users = users;
        }

        public override Task OnConnected()
        {
            _users.OnConnected(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            _users.OnDisconnected(Context.ConnectionId);
            return base.OnDisconnected();
        }

        public override Task OnReconnected()
        {
            _users.OnReconnected(Context.ConnectionId);
            return base.OnReconnected();
        }

        [HubMethodName("LoadCompressionContracts")]
        public void LoadCompressionContracts()
        {
            if (_users.UserExists(Context.ConnectionId))
            {
                try
                {
                    Clients.Caller.loadCompressionContracts(PayloadManager.GetCompressionContacts());
                }
                catch (Exception ex)
                {
                    ErrorLog.Instance.Log(ex);
                }
            }
        }
    }
}
