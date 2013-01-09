using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public static class NumberExtensions
    {
        public static double Normalized(this double val)
        {
            return val / Math.Abs(val);
        }

        public static int Normalized(this int val)
        {
            return val / Math.Abs(val);
        }
    }
}
