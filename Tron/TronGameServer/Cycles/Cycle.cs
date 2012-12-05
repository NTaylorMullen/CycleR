
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Cycle : Collidable, IDisposable
    {
        private PendingMovementManager _pendingMovementManager;

        public Cycle(long id, Vector3 startPosition, Vector3 startVelocity, double startRotation, int trailColor, MapConfiguration mapConfiguration, Action<Cycle, CycleMovementFlag> broadcastMovement)
            : base(id)
        {
            MovementController = new CycleMovementController(startPosition, startVelocity, startRotation, mapConfiguration);
            TrailColor = trailColor;
            _pendingMovementManager = new PendingMovementManager(this, broadcastMovement);
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

        public override void HandleCollisionWith(Collidable obj)
        {
            base.HandleCollisionWith(obj);

            Alive = false;
        }

        public void RegisterMove(CycleMovementFlag direction, Action<Cycle, CycleMovementFlag> broadcastMovement)
        {
            _pendingMovementManager.Add(new PendingMovement(HeadLocation, MovementController.Position, direction));            
        }

        public override void Update(GameTime gameTime)
        {
            _pendingMovementManager.Update(gameTime);

            base.Update(gameTime);
        }

        public override void Dispose()
        {
            base.Dispose();
            HeadLocation = null;
        }

    }
}
