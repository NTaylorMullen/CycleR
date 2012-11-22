using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.Server
{
    interface IConnectionHandler
    {
        void OnConnected(string connectionID);
        void OnReconnected(string connectionID);
        void OnDisconnected(string connectionID);
    }
}
