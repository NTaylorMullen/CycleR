namespace Tron.GameServer
{
    public class User
    {
        public User(string connectionID, long userID)
        {
            ConnectionID = connectionID;
            ID = userID;
        }

        public string ConnectionID { get; private set; }
        public long ID { get; private set; }
        public Match CurrentMatch { get; set; }

        public bool InMatch()
        {
            return CurrentMatch != null;
        }
    }
}