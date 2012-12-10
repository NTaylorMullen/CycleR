using Tron.Utilities;

namespace Tron.GameServer
{
    public class CollisionPayload
    {
        public long ID { get; set; }
        public Vector3 CollidedAt { get; set; }
    }
}
