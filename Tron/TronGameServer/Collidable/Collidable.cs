using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Collidable : IUpdateable, IDisposable
    {
        public Collidable(long id)
        {
            ID = id;
            Alive = true;
            CollidedAt = Vector3.Zero;
        }

        public virtual MovementController MovementController { get; protected set; }

        public long ID { get; private set; }
        public bool Alive { get; protected set; }
        public bool Collided { get; protected set; }
        public Vector3 CollidedAt { get; protected set; }

        public virtual void HandleCollisionWith(Collidable obj)
        {
            Collided = true;
            CollidedAt = MovementController.Position.Clone();
        }

        public virtual void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime);
        }

        public virtual void Dispose()
        {
            MovementController.Dispose();
            Alive = false;
        }
    }
}
