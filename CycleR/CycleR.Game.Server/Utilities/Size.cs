using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CycleR.Utilities
{
    public class Size
    {
        public Size(int width, int height)
        {
            Width = width;
            Height = height;
        }

        public Size(int size)
        {
            Width = size;
            Height = size;
        }

        public int Width { get; set; }
        public int Height { get; set; }

        public static Size operator *(Size s1, Size s2)
        {
            return new Size(s1.Width * s2.Width, s1.Height * s2.Height);
        }

        public static Size operator *(Size s1, int num)
        {
            return new Size(s1.Width * num, s1.Height * num);
        }
        
        public static Size operator *(int num, Size s1)
        {
            return new Size(s1.Width * num, s1.Height * num);
        }

        public static Size operator *(Size s1, double num)
        {
            return new Size(Convert.ToInt32(s1.Width * num), Convert.ToInt32(s1.Height * num));
        }

        public static Size operator *(double num, Size s1)
        {
            return new Size(Convert.ToInt32(s1.Width * num), Convert.ToInt32(s1.Height * num));
        }
    }
}
