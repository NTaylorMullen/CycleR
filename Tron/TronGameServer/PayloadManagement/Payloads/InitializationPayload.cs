using System.Collections.Generic;

namespace Tron.GameServer
{
    public class InitializationPayload : IPayload
    {
        public List<object> Cycles { get; set; }
    }
}
