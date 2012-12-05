using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class BroadcastHandler : IDisposable
    {
        private const string RELAY_GROUP_PREFIX = "RELAY_";
        private string _relayGroup = RELAY_GROUP_PREFIX;
        private List<User> _users;

        public BroadcastHandler(long matchID, IEnumerable<User> players)
        {
            _relayGroup += matchID;
            _users = new List<User>(players);

            joinBroadcastGroup();
        }

        private IHubContext getGameContext()
        {
            return GlobalHost.ConnectionManager.GetHubContext<GameServer>();
        }

        private void joinBroadcastGroup()
        {
            var context = getGameContext();

            foreach (User user in _users)
            {
                context.Groups.Add(user.ConnectionID, _relayGroup);
            }
        }

        private void leaveBroadcastGroup()
        {
            var context = getGameContext();

            foreach (User user in _users)
            {
                context.Groups.Remove(user.ConnectionID, _relayGroup);
            }
        }

        public void BroadcastConfiguration(GameConfiguration gameConfig)
        {
            getGameContext().Clients.Group(_relayGroup).configure(gameConfig);
        }

        public void BroadcastGameStart(List<Cycle> cycles)
        {
            var compressedPayload = PayloadManager.BuildInitializationPayload(cycles);
            getGameContext().Clients.Group(_relayGroup).startGame(compressedPayload);
        }

        public void BroadcastMovement(Cycle cycle, CycleMovementFlag direction)
        {
            var compressedPayload = PayloadManager.BuildMovementPayload(cycle, direction);
            getGameContext().Clients.Group(_relayGroup).movementPayload(compressedPayload);
        }

        public void BroadcastDeath(Cycle cycle)
        {
            var compressedPayload = PayloadManager.BuildDeathPayload(cycle);
            getGameContext().Clients.Group(_relayGroup).deathPayload(compressedPayload);
        }

        public void Dispose()
        {
            leaveBroadcastGroup();

            _users.Clear();
            _users = null;
        }
    }
}
