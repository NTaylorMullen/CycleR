using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    [HubName("GameServer")]
    public class GameServer : Hub
    {        
        private readonly Matches _matches;
        private readonly Users _users;

        public GameServer() : this(Matches.Instance, Users.Instance) { }

        public GameServer(Matches matches, Users users)
        {
            _matches = matches;
            _users = users;
        }

        #region Connection Methods
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
        #endregion
    }
}