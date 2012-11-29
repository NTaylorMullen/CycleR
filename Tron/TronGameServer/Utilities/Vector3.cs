using System;

namespace Tron.Utilities
{
    public class Vector3
    {
        public Vector3()
        {
            X = 0;
            Y = 0;
            Z = 0;
        }


        public Vector3(double x, double y, double z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public Vector3(int x, int y, int z)
        {
            X = Convert.ToDouble(x);
            Y = Convert.ToDouble(y);
            Z = Convert.ToDouble(z);
        }

        public Vector3(Vector3 v)
        {
            X = v.X;
            Y = v.Y;
            Z = v.Z;
        }

        public static Vector3 Zero
        {
            get
            {
                return new Vector3();
            }
        }

        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }        

        public Vector3 Abs()
        {
            return new Vector3(Math.Abs(X), Math.Abs(Y), Math.Abs(Z));
        }

        public double DistanceTo(Vector3 to)
        {
            return Math.Sqrt(Math.Pow(to.X - X, 2) + Math.Pow(to.Y - Y, 2) + Math.Pow(to.Z - Z, 2));
        }

        public static Vector3 operator *(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X * v2.X, v1.Y * v2.Y, v1.Z * v2.Z);
        }

        public static Vector3 operator *(Vector3 v1, double num)
        {
            return new Vector3(v1.X * num, v1.Y * num, v1.Z * num);
        }

        public static Vector3 operator *(double num, Vector3 v1)
        {
            return new Vector3(v1.X * num, v1.Y * num, v1.Z * num);
        }

        public static Vector3 operator /(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X / v2.X, v1.Y / v2.Y, v1.Z / v2.Z);
        }

        public static Vector3 operator /(Vector3 v1, double num)
        {
            return new Vector3(v1.X / num, v1.Y / num, v1.Z / num);
        }

        public static Vector3 operator /(double num, Vector3 v1)
        {
            return new Vector3(num / v1.X, num / v1.Y, num / v1.Z);
        }

        public static Vector3 operator +(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
        }

        public static Vector3 operator +(Vector3 v1, double num)
        {
            return new Vector3(v1.X + num, v1.Y + num, v1.Z + num);
        }

        public static Vector3 operator +(double num, Vector3 v1)
        {
            return new Vector3(v1.X + num, v1.Y + num, v1.Z + num);
        }

        public static Vector3 operator -(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
        }

        public static Vector3 operator -(Vector3 v1, double num)
        {
            return new Vector3(v1.X - num, v1.Y - num, v1.Z - num);
        }

        public static Vector3 operator -(double num, Vector3 v1)
        {
            return new Vector3(num - v1.X, num - v1.Y, num - v1.Z);
        }

        public Vector3 Clone()
        {
            return new Vector3(X, Y, Z);
        }

        public override string ToString()
        {
            return "( " + X + " , " + Y + " , " + Z + " )";
        }
    }
}