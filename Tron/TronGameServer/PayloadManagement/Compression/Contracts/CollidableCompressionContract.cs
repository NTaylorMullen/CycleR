namespace Tron.GameServer
{
    public class CollidableCompressionContract
    {
        public short ID = 0;
        public short Alive = 1;
        public short Collided = 2;
        public short CollidedAt_X = 3;
        public short CollidedAt_Y = 4;
        public short CollidedAt_Z = 5;
        public short Position_X = 6;
        public short Position_Y = 7;
        public short Position_Z = 8;
        public short Velocity_X = 9;
        public short Velocity_Y = 10;
        public short Velocity_Z = 11;
        public short Rotation = 12;
    }
}
