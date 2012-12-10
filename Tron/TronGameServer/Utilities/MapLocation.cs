using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.Utilities
{
    public class MapLocation
    {
        public MapLocation(short row, short column)
        {
            Row = row;
            Column = column;
        }

        public MapLocation(double row, double column)
        {
            Row = Convert.ToInt16(row);
            Column = Convert.ToInt16(column);
        }

        public short Row { get; set; }
        public short Column { get; set; }

        public bool SameAs(MapLocation mapLocation)
        {
            return Row == mapLocation.Row && Column == mapLocation.Column;
        }

        public MapLocation Clone()
        {
            return new MapLocation(Row, Column);
        }

        public override string ToString()
        {
            return "( " + Row + ", " + Column + " )";
        }
    }
}
