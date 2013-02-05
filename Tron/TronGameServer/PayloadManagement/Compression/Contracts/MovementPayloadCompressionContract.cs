using System;

namespace Tron.GameServer
{
    public class MovementPayloadCompressionContract
    {
        public short ID = 0;
        public short Direction = 1;
        public short Position_X = 2;
        public short Position_Y = 3;
        public short Position_Z = 4;
    }
}
