using Microsoft.AspNet.SignalR.Hubs;
using System;
using Tron.Utilities;

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

        [HubMethodName("Move")]
        public void Move(string where)
        {
            if (_users.UserExists(Context.ConnectionId))
            {
                try
                {
                    User user = Users.Instance.GetUser(Context.ConnectionId);

                    if (user.InMatch())
                    {
                        CycleMovementFlag direction = (CycleMovementFlag)Enum.Parse(typeof(CycleMovementFlag), where);

                        user.CurrentMatch.Game.CommandHandler.MovementCommand(user, direction);
                    }
                }
                catch (Exception ex)
                {
                    ErrorLog.Instance.Log(ex);
                }
            }
        }
    }
}