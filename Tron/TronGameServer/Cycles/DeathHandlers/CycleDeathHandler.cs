using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public class CycleDeathHandler : IUpdateable, IDisposable
    {
        private static readonly TimeSpan DEATH_AFTER = TimeSpan.FromSeconds(3);

        private DateTime? _deathStartedAt;
        private Collidable _killedBy;
        private Cycle _owner;

        public CycleDeathHandler(Cycle owner)
        {
            _owner = owner;
            _deathStartedAt = null;
            _owner.OnCollision += collision;
        }

        private void collision(object sender, CollisionEventArgs e)
        {
            if(!_deathStartedAt.HasValue)
            {
                _killedBy = e.CollidedWith;
                _deathStartedAt = GameTime.LastUpdated; // Last Updated is nearly equivalent to the current time
            }
        }

        public void Update(GameTime gameTime)
        {
            var velocityZero = _owner.MovementController.Velocity.IsZero();
            if (_deathStartedAt.HasValue
                && gameTime.Now - _deathStartedAt >= DEATH_AFTER
                && velocityZero)
            {
                // We've died
                _owner.Die(_killedBy);
            }
            else if (!velocityZero)
            {
                _deathStartedAt = null;
                _killedBy = null;
            }
        }

        public void Dispose()
        {
            _deathStartedAt = null;
            _killedBy = null;
            _owner.OnCollision -= collision;
            _owner = null; ;
        }
    }
}
