using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class MovementController : IUpdateable, IDisposable
    {
        public MovementController(Vector3 position, Vector3 velocity, double rotation)
        {
            Position = position;
            Velocity = velocity;            
            Rotation = rotation;
        }

        public Vector3 Velocity { get; protected set; }
        public Vector3 Position { get; protected set; }
        public double Rotation { get; protected set; }

        public virtual void Update(GameTime gameTime)
        {            
        }

        public virtual void Dispose()
        {
            Velocity = null;
            Position = null;
        }
    }
}