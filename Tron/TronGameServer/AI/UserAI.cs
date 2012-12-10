using System;

namespace Tron.GameServer.AI
{
    public class UserAI : User
    {
        public UserAI(long userID)
            : base(Guid.NewGuid().ToString(), userID)
        {
        }


    }
}
