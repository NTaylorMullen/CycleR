using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class GameBroadcastHandler : IDisposable
    {
        private const string RELAY_GROUP_PREFIX = "RELAY_";
        private string _relayGroup = RELAY_GROUP_PREFIX;
        private List<User> _users;

        public GameBroadcastHandler(long matchID, IEnumerable<User> players)
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
            object configuration = new
            {
                GameConfiguration = gameConfig,
                CompressionContracts = PayloadManager.GetCompressionContacts()
            };

            getGameContext().Clients.Group(_relayGroup).configure(configuration);
        }

        public void BroadcastCycle(Cycle cycle)
        {
            List<Cycle> cycles = new List<Cycle>(1){cycle};
            BroadcastCycles(cycles);
        }

        public void BroadcastCycles(List<Cycle> cycles)
        {
            var compressedPayload = PayloadManager.BuildPayload(cycles);
            getGameContext().Clients.Group(_relayGroup).serverPayload(compressedPayload);
        }

        public void Dispose()
        {
            leaveBroadcastGroup();

            _users.Clear();
            _users = null;
        }
    }
}
