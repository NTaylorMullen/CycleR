using Tron.Utilities;

namespace Tron.GameServer
{
    public class DeathPayload : IPayload
    {
        public long ID { get; set; }
        public Vector3 DiedAt { get; set; }
    }
}
