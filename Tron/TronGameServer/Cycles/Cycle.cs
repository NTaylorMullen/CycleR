
using System;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Cycle : Collidable, IDisposable
    {
        private PendingMovementManager _pendingMovementManager;
        private CycleDeathHandler _cycleDeathHandler;
        private Map _map;

        public event CollisionEventHandler OnCollision;
        public event DeathEventHandler OnDeath;
        public event MoveEventHandler OnMove;

        public Cycle(long id, Vector3 startPosition, Vector3 startVelocity, double startRotation, int trailColor, Map map, GameConfiguration gameConfiguration)
            : base(id)
        {
            MovementController = new CycleMovementController(startPosition, startVelocity, startRotation, gameConfiguration);
            TrailColor = trailColor;
            _pendingMovementManager = new PendingMovementManager(this);
            _cycleDeathHandler = new CycleDeathHandler(this);
            _map = map;
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

        public MapLocation HeadLocation { get; set; }
        public int TrailColor { get; private set; }

        protected List<MovementFlag> getValidMovements()
        {
            var validMovements = new List<MovementFlag>();
            var rotation = Math.Round(MovementController.Rotation);
            var locationCheck = HeadLocation.Clone();

            if (rotation == 0) // Going up
            {
                locationCheck.Column--;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Column += 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 2) // Going Left
            {
                locationCheck.Row++;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Row -= 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 3) // Going Down
            {
                locationCheck.Column++;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Column -= 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 5) // Going Right
            {
                locationCheck.Row--;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Row += 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }

            return validMovements;
        }

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
        }

        public bool CanMove(MovementFlag direction)
        {
            return getValidMovements().Contains(direction);
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
            _pendingMovementManager.Add(new PendingMovement(HeadLocation, MovementController.Position, direction));
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
            _map = null;
            HeadLocation = null;
            OnCollision = null;
            OnDeath = null;
            OnMove = null;
        }

    }
}
