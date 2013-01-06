using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public static class DoubleExtensions
    {
        public static double Normalized(this double val)
        {
            return val / Math.Abs(val);
        }
    }
}
