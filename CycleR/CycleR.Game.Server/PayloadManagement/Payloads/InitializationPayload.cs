using System.Collections.Generic;

namespace CycleR.Game.Server
{
    public class InitializationPayload : IPayload
    {
        public List<object> Cycles { get; set; }
    }
}
