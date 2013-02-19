using System;

namespace CycleR.Game.Server
{
    public delegate void CollisionEventHandler(object sender, CollisionEventArgs e);

    public class CollisionEventArgs : EventArgs
    {
        public CollisionEventArgs(Collidable collidedWith)
        {
            CollidedWith = collidedWith;
        }

        public Collidable CollidedWith { get; private set; }
    }
}