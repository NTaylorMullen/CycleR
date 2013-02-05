
using System;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Cycle : Collidable, IDisposable
    {
        private PendingMovementManager _pendingMovementManager;
        private CycleDeathHandler _cycleDeathHandler;

        public event CollisionEventHandler OnCollision;
        public event DeathEventHandler OnDeath;
        public event MoveEventHandler OnMove;
        // Used via Move
        public event EventHandler OnForcedPositionChange;

        public Cycle(long id, Vector3 startPosition, Vector3 startVelocity, double startRotation, int trailColor, Map map, GameConfiguration gameConfiguration)
            : base(id)
        {
            MovementController = new CycleMovementController(startPosition, startVelocity, startRotation, map, gameConfiguration);
            TrailColor = trailColor;
            _pendingMovementManager = new PendingMovementManager(this);
            _cycleDeathHandler = new CycleDeathHandler(this);
        }

        public CycleMovementController MovementController
        {
            get
            {
                return base.MovementController as CycleMovementController;
            }
            set
            {
                base.MovementController = value;
            }
        }

        public int TrailColor { get; private set; }        

        public void Move(MovementFlag direction)
        {
            // This must be before the Move takes place so that the same logic can occur on the client
            if (OnMove != null)
            {
                OnMove(this, new MoveEventArgs(direction));
            }

            MovementController.Move(direction);

            if (!MovementController.Velocity.IsZero())
            {
                Colliding = false;
            }

            if (OnForcedPositionChange != null)
            {
                OnForcedPositionChange(this, null);
            }
        }        

        public void Die(Collidable killedBy)
        {
            Alive = false;

            if (OnDeath != null)
            {
                OnDeath(this, new DeathEventArgs(killedBy));
            }
        }

        public override void HandleCollisionWith(Collidable obj)
        {
            if (!MovementController.Velocity.IsZero())
            {
                base.HandleCollisionWith(obj);

                if (OnCollision != null)
                {
                    OnCollision(this, new CollisionEventArgs(obj));
                }

                MovementController.Velocity = Vector3.Zero;
            }
        }

        public void RegisterMove(MovementFlag direction)
        {
            _pendingMovementManager.Add(new PendingMovement(MovementController.HeadLocation, MovementController.Position, direction));
        }

        public override void Update(GameTime gameTime)
        {
            _pendingMovementManager.Update(gameTime);
            _cycleDeathHandler.Update(gameTime);

            base.Update(gameTime);
        }

        public override void Dispose()
        {
            base.Dispose();
            _pendingMovementManager.Dispose();
            _cycleDeathHandler.Dispose();
            MovementController.HeadLocation = null;
            OnCollision = null;
            OnDeath = null;
            OnMove = null;
        }

    }
}
