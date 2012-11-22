using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace Tron.Server
{
    [HubName("GameHub")]
    public class GameHub : Hub
    {        
        private readonly Game _game;
        private readonly Users _users;

        public GameHub() : this(Game.Instance, Users.Instance) { }

        public GameHub(Game game, Users users)
        {
            _game = game;
            _users = users;
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            return base.OnDisconnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }
    }
}