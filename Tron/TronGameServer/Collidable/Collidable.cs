using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public class Collidable : IUpdateable, IDisposable
    {
        public Collidable(long id)
        {
        }

        public virtual MovementController MovementController { get; protected set; }
        public bool Alive { get; protected set; }
        public long ID { get; private set; }

        public virtual void HandleCollisionWith(Collidable obj)
        {
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
