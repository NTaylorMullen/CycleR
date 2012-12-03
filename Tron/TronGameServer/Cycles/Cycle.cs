using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Cycle : Collidable, IDisposable
    {
        public Cycle(long id, Vector3 startPosition, Vector3 startVelocity, double startRotation, int trailColor, MapConfiguration mapConfiguration)
            : base(id)
        {
            MovementController = new CycleMovementController(startPosition, startVelocity, startRotation, mapConfiguration);
            TrailColor = trailColor;
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

        public void Move(CycleMovementFlag direction)
        {
            MovementController.Move(direction);
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);            
        }

        public override void Dispose()
        {
            base.Dispose();
            HeadLocation = null;
        }
    
    }
}
