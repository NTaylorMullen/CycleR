using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
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

        public void RegisterCycles(ConcurrentDictionary<long, Cycle> cycles)
        {
            foreach (var cycle in cycles.Values)
            {
                cycle.OnDeath += BroadcastDeath;
                cycle.OnMove += BroadcastMovement;
                cycle.OnCollision += BroadcastCollision;
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

        public void BroadcastMovement(object sender, MoveEventArgs e)
        {
            var compressedPayload = PayloadManager.BuildMovementPayload(sender as Cycle, e.Direction);
            getGameContext().Clients.Group(_relayGroup).movementPayload(compressedPayload);
        }

        public void BroadcastDeath(object sender, DeathEventArgs e)
        {
            var compressedPayload = PayloadManager.BuildDeathPayload(sender as Cycle);
            getGameContext().Clients.Group(_relayGroup).deathPayload(compressedPayload);
        }

        public void BroadcastCollision(object sender, CollisionEventArgs e)
        {
            var compressedPayload = PayloadManager.BuildCollisionPayload(sender as Cycle);
            getGameContext().Clients.Group(_relayGroup).collisionPayload(compressedPayload);
        }

        public void Dispose()
        {
            leaveBroadcastGroup();

            _users.Clear();
            _users = null;
        }
    }
}
