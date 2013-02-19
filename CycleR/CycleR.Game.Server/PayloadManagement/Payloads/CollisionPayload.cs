using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class CollisionPayload
    {
        public long ID { get; set; }
        public Vector3 CollidedAt { get; set; }
    }
}
