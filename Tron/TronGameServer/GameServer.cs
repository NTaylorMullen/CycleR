using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
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

        [HubMethodName("ReadyToStartGame")]
        public void ReadyToStartGame()
        {
            if (_users.UserExists(Context.ConnectionId))
            {
                try
                {
                    User user = Users.Instance.GetUser(Context.ConnectionId);

                    if(user.InMatch())
                    {
                        user.CurrentMatch.UserReady(user);
                    }
                }
                catch (Exception ex)
                {
                    ErrorLog.Instance.Log(ex);
                }
            }
        }

        [HubMethodName("StartMatch")]
        public void StartMatch()
        {
            if (_users.UserExists(Context.ConnectionId))
            {
                try
                {
                    List<User> users = new List<User>(){Users.Instance.GetUser(Context.ConnectionId),
                    new User(Guid.NewGuid().ToString(), 100),
                    new User(Guid.NewGuid().ToString(), 200),
                    new User(Guid.NewGuid().ToString(), 300)};


                    Matches.Instance.Create(users, new FreeForAll()).Start();
                }
                catch (Exception ex)
                {
                    ErrorLog.Instance.Log(ex);
                }
            }
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