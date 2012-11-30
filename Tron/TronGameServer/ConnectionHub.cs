using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

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
    }
}
