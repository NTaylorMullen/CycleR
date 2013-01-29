using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.Utilities
{
    public class MapLocation
    {
        public MapLocation(int row, int column)
        {
            Row = row;
            Column = column;
        }

        public MapLocation(double row, double column)
        {
            Row = Convert.ToInt16(row);
            Column = Convert.ToInt16(column);
        }

        public int Row { get; set; }
        public int Column { get; set; }

        public bool SameAs(MapLocation mapLocation)
        {
            return Row == mapLocation.Row && Column == mapLocation.Column;
        }

        /// <summary>
        /// Used to pull the valid working value (non zero)
        /// </summary>
        /// <returns>Returns the row or column that is not zero as a value</returns>
        public int NonZeroValue()
        {
            if (Row != 0 && Column != 0)
            {
                throw new InvalidOperationException("There is no zero value");
            }
            else if (Row != 0)
            {
                return Row;
            }

            return Column;
        }

        public MapLocation Abs()
        {
            return new MapLocation(Math.Abs(Row), Math.Abs(Column));
        }

        public MapLocation Clone()
        {
            return new MapLocation(Row, Column);
        }

        public MapLocation Normalized()
        {
            return new MapLocation((Row != 0) ? Row / Math.Abs(Row) : 0, (Column != 0) ? Column / Math.Abs(Column) : 0);
        }

        public static bool operator >(MapLocation m1, double num)
        {
            return m1.Row > num || m1.Column > num;
        }

        public static bool operator >=(MapLocation m1, double num)
        {
            return m1.Row >= num || m1.Column >= num;
        }

        public static bool operator <(MapLocation m1, double num)
        {
            return m1.Row < num || m1.Column < num;
        }

        public static bool operator <=(MapLocation m1, double num)
        {
            return m1.Row <= num || m1.Column <= num;
        }

        public static MapLocation operator *(MapLocation m1, MapLocation m2)
        {
            return new MapLocation(m1.Row * m2.Row, m1.Column * m2.Column);
        }

        public static MapLocation operator *(MapLocation m1, double num)
        {
            return new MapLocation(m1.Row * num, m1.Column * num);
        }

        public static MapLocation operator *(double num, MapLocation m1)
        {
            return new MapLocation(m1.Row * num, m1.Column * num);
        }

        public static MapLocation operator /(MapLocation m1, MapLocation m2)
        {
            return new MapLocation(m1.Row / m2.Row, m1.Column / m2.Column);
        }

        public static MapLocation operator /(MapLocation m1, double num)
        {
            return new MapLocation(m1.Row / num, m1.Column / num);
        }

        public static MapLocation operator /(double num, MapLocation m1)
        {
            return new MapLocation(num / m1.Row, num / m1.Column);
        }

        public static MapLocation operator +(MapLocation m1, MapLocation m2)
        {
            return new MapLocation(m1.Row + m2.Row, m1.Column + m2.Column);
        }

        public static MapLocation operator +(MapLocation m1, double num)
        {
            return new MapLocation(m1.Row + num, m1.Column + num);
        }

        public static MapLocation operator +(double num, MapLocation m1)
        {
            return new MapLocation(m1.Row + num, m1.Column + num);
        }

        public static MapLocation operator -(MapLocation m1, MapLocation m2)
        {
            return new MapLocation(m1.Row - m2.Row, m1.Column - m2.Column);
        }

        public static MapLocation operator -(MapLocation m1, double num)
        {
            return new MapLocation(m1.Row - num, m1.Column - num);
        }

        public static MapLocation operator -(double num, MapLocation m1)
        {
            return new MapLocation(num - m1.Row, num - m1.Column);
        }

        public override string ToString()
        {
            return "( " + Row + ", " + Column + " )";
        }
    }
}
