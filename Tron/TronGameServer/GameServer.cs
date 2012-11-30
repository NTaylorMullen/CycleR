using Microsoft.AspNet.SignalR.Hubs;
using System;
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

        public void MoveCycle(string where)
        {
            if (_users.UserExists(Context.ConnectionId))
            {
                CycleMovementFlag direction = (CycleMovementFlag)Enum.Parse(typeof(CycleMovementFlag), where);
            }
        }
    }
}