using System;

namespace Tron.Utilities
{
    public class Vector3
    {
        public Vector3()
        {
            x = 0;
            y = 0;
            z = 0;
        }

        public Vector3(double x, double y, double z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public Vector3(int x, int y, int z)
        {
            this.x = Convert.ToDouble(x);
            this.y = Convert.ToDouble(y);
            this.z = Convert.ToDouble(z);
        }

        public Vector3(Vector3 v)
        {
            x = v.x;
            y = v.y;
            z = v.z;
        }

        public static Vector3 Zero
        {
            get
            {
                return new Vector3();
            }
        }

        public double x { get; set; }
        public double y { get; set; }
        public double z { get; set; }        

        public Vector3 Abs()
        {
            return new Vector3(Math.Abs(x), Math.Abs(y), Math.Abs(z));
        }

        public double DistanceTo(Vector3 to)
        {
            return Math.Sqrt(Math.Pow(to.x - x, 2) + Math.Pow(to.y - y, 2) + Math.Pow(to.z - z, 2));
        }

        public static Vector3 operator *(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
        }

        public static Vector3 operator *(Vector3 v1, double num)
        {
            return new Vector3(v1.x * num, v1.y * num, v1.z * num);
        }

        public static Vector3 operator *(double num, Vector3 v1)
        {
            return new Vector3(v1.x * num, v1.y * num, v1.z * num);
        }

        public static Vector3 operator /(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
        }

        public static Vector3 operator /(Vector3 v1, double num)
        {
            return new Vector3(v1.x / num, v1.y / num, v1.z / num);
        }

        public static Vector3 operator /(double num, Vector3 v1)
        {
            return new Vector3(num / v1.x, num / v1.y, num / v1.z);
        }

        public static Vector3 operator +(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        }

        public static Vector3 operator +(Vector3 v1, double num)
        {
            return new Vector3(v1.x + num, v1.y + num, v1.z + num);
        }

        public static Vector3 operator +(double num, Vector3 v1)
        {
            return new Vector3(v1.x + num, v1.y + num, v1.z + num);
        }

        public static Vector3 operator -(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        }

        public static Vector3 operator -(Vector3 v1, double num)
        {
            return new Vector3(v1.x - num, v1.y - num, v1.z - num);
        }

        public static Vector3 operator -(double num, Vector3 v1)
        {
            return new Vector3(num - v1.x, num - v1.y, num - v1.z);
        }

        public bool IsZero()
        {
            return x == 0 && y == 0 && z == 0;
        }

        public Vector3 Clone()
        {
            return new Vector3(x, y, z);
        }

        public override string ToString()
        {
            return "( " + x + " , " + y + " , " + z + " )";
        }

        public bool SameAs(Vector3 v3)
        {
            return x == v3.x && y == v3.y && z == v3.z;
        }
    }
}