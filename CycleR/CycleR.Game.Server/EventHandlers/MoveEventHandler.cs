using System;

namespace CycleR.Game.Server
{
    public delegate void MoveEventHandler(object sender, MoveEventArgs e);

    public class MoveEventArgs : EventArgs
    {
        public MoveEventArgs(MovementFlag direction)
        {
            Direction = direction;
        }

        public MovementFlag Direction { get; private set; }
    }
}