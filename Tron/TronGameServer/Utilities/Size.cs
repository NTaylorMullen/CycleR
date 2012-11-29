using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.Utilities
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
    }
}
