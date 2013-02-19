using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CycleR.Game.Server
{
    public static class TMath
    {
        private static double _halfPI = Math.PI / 2;
        private static double _twoPI = Math.PI * 2;
        private static double _oneAndOneHalfPI = Math.PI * 1.5;

        public static double HALF_PI
        {
            get
            {
                return _halfPI;
            }
        }

        public static double TWO_PI
        {
            get
            {
                return _twoPI;
            }
        }

        public static double ONE_AND_ONE_HALF_PI
        {
            get
            {
                return _oneAndOneHalfPI;
            }
        }

        public static double PI
        {
            get
            {
                return Math.PI;
            }
        }
    }
}
