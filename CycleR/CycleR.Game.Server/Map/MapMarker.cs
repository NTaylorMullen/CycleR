using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class MapMarker
    {
        private Map _map;
        private MapUtilities _utilities;

        public MapMarker(Map map)
        {
            _map = map;
            _utilities = _map.Utilities;
        }

        public void MarkArea(MapLocation from, MapLocation to, long fillValue, bool inclusive)
        {
            var difference = from - to;

            // Check where we need to fill in the gap
            if (difference.Abs() > 1)
            {
                var incrementor = difference.Normalized().Abs();

                // If the requested location is going in the negative direction then we need our incrementor
                // to also be pointing in the negative direction.
                if (difference > 0)
                {
                    incrementor *= -1;
                }

                // If we're not inclusive then we want to step back one more (chances are our actual position is out of bounds)
                if (!inclusive)
                {
                    to -= incrementor;
                }

                // We do not want to mark the current location "to" because that's our new headlocation
                for (MapLocation i = from + incrementor; !i.SameAs(to); i += incrementor)
                {
                    Debug.WriteLine("Marking: " + i + " with " + fillValue); 
                    _map[i.Row, i.Column] = fillValue;
                }
            }
        }
    }
}
