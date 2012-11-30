namespace Tron.GameServer
{
    public class User
    {
        public User(string connectionID, long userID)
        {
            ConnectionID = connectionID;
        }

        public string ConnectionID { get; private set; }
        public long ID { get; private set; }
        public Cycle Cycle { get; set; }
    }
}