using System;
using System.Collections.Concurrent;
using System.Threading;

namespace Tron.GameServer
{
    public class UserHandler
    {
        private static long _userIDs = 1;
        private ConcurrentDictionary<string, User> _userList;

        public UserHandler()
        {
            _userList = new ConcurrentDictionary<string, User>();
        }

        public void CreateUser(string connectionId)
        {
            _userList.TryAdd(connectionId, new User(connectionId, Interlocked.Increment(ref _userIDs)));
        }

        public void RemoveUser(string connectionId)
        {
            User user;
            _userList.TryRemove(connectionId, out user);
        }

        public User GetUser(string connectionID)
        {
            if (_userList.ContainsKey(connectionID))
            {
                return _userList[connectionID];
            }
            else
            {
                return null;
            }
        }

        public bool UserExists(string connectionID)
        {
            return _userList.ContainsKey(connectionID);
        }
    }
}