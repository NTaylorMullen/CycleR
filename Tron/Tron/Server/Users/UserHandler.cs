using System.Collections.Concurrent;

namespace Tron.Server
{
    public class UserHandler
    {
        private ConcurrentDictionary<string, User> _userList;

        public UserHandler()
        {
            _userList = new ConcurrentDictionary<string, User>();
        }

        public void AddUser(User user)
        {
            _userList.TryAdd(user.ConnectionID, user);
        }

        public void RemoveUser(User user)
        {
            _userList.TryRemove(user.ConnectionID, out user);
        }

        public User GetUser(string connectionID)
        {
            return _userList[connectionID];
        }
    }
}