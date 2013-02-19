using System;

namespace CycleR.Utilities
{
    public class Vector2
    {
        public Vector2()
        {
            x = 0;
            y = 0;
        }

        public Vector2(double rotation)
        {
            double radians = rotation * Math.PI / 180;
            x = Math.Cos(radians);
            y = Math.Sin(radians);
        }

        public Vector2(double x, double y)
        {
            this.x = x;
            this.y = y;
        }

        public Vector2(int x, int y)
        {
            this.x = Convert.ToDouble(x);
            this.y = Convert.ToDouble(y);
        }

        public Vector2(Vector2 v)
        {
            x = v.x;
            y = v.y;
        }

        public static Vector2 Zero
        {
            get
            {
                return new Vector2();
            }
        }

        public double x { get; set; }
        public double y { get; set; }

        public Vector2 Normalized()
        {
            double length = this.Length();
            return new Vector2(x / length, y / length);
        }

        public double Length()
        {
            return Math.Sqrt(Math.Pow(x, 2) + Math.Pow(y, 2));
        }

        public Vector2 Abs()
        {
            return new Vector2(Math.Abs(x), Math.Abs(y));
        }

        public double DistanceTo(Vector2 to)
        {
            return Math.Sqrt(Math.Pow(to.x - x, 2) + Math.Pow(to.y - y, 2));
        }

        public static Vector2 operator *(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.x * v2.x, v1.y * v2.y);
        }

        public static Vector2 operator *(Vector2 v1, double num)
        {
            return new Vector2(v1.x * num, v1.y * num);
        }

        public static Vector2 operator *(double num, Vector2 v1)
        {
            return new Vector2(v1.x * num, v1.y * num);
        }

        public static Vector2 operator /(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.x / v2.x, v1.y / v2.y);
        }

        public static Vector2 operator /(Vector2 v1, double num)
        {
            return new Vector2(v1.x / num, v1.y / num);
        }

        public static Vector2 operator /(double num, Vector2 v1)
        {
            return new Vector2(num / v1.x, num / v1.y);
        }

        public static Vector2 operator +(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.x + v2.x, v1.y + v2.y);
        }

        public static Vector2 operator +(Vector2 v1, double num)
        {
            return new Vector2(v1.x + num, v1.y + num);
        }

        public static Vector2 operator +(double num, Vector2 v1)
        {
            return new Vector2(v1.x + num, v1.y + num);
        }

        public static Vector2 operator -(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.x - v2.x, v1.y - v2.y);
        }

        public static Vector2 operator -(Vector2 v1, double num)
        {
            return new Vector2(v1.x - num, v1.y - num);
        }

        public static Vector2 operator -(double num, Vector2 v1)
        {
            return new Vector2(num - v1.x, num - v1.y);
        }

        public Vector2 Clone()
        {
            return new Vector2(x, y);
        }

        public override string ToString()
        {
            return "( " + x + " , " + y + " )";
        }
    }
}