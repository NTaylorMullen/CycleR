namespace Tron.Server
{
    public class User
    {
        public User(string connectionID)
        {
            ConnectionID = connectionID;
        }

        public string ConnectionID { get; private set; }
    }
}