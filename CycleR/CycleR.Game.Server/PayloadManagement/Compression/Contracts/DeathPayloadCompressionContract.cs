using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CycleR.Game.Server
{
    public class DeathPayloadCompressionContract
    {
        public short ID = 0;
        public short DiedAt_X = 1;
        public short DiedAt_Y = 2;
        public short DiedAt_Z = 3;
    }
}
