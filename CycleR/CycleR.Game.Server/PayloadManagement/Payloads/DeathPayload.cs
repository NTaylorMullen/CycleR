using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class DeathPayload : IPayload
    {
        public long ID { get; set; }
        public Vector3 DiedAt { get; set; }
    }
}
