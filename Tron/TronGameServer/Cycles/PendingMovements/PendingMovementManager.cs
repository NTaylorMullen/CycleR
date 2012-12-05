using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public class PendingMovementManager : IUpdateable
    {
        public const int MAX_MOVEMENTS_IN_QUEUE = 2;

        private Cycle _owner;
        private Queue<PendingMovement> _pendingMovements;
        private Action<Cycle, CycleMovementFlag> _broadcastMovement;
        private object _locker;

        public PendingMovementManager(Cycle owner, Action<Cycle, CycleMovementFlag> broadcastMovement)
        {
            _owner = owner;
            _pendingMovements = new Queue<PendingMovement>();
            _broadcastMovement = broadcastMovement;
        }

        private void applyMovement(PendingMovement movement)        
        {
            _owner.MovementController.Position = movement.StartLocation;
                _broadcastMovement(_owner, movement.Direction);
            _owner.MovementController.Move(movement.Direction);
            movement.Dispose();
        }

        public void Add(PendingMovement pendingMovement)
        {
            if (_pendingMovements.Count < MAX_MOVEMENTS_IN_QUEUE)
            {
                _pendingMovements.Enqueue(pendingMovement);
            }
        }

        public void Update(GameTime gameTime)
        {
            if (_pendingMovements.Count > 0 && _pendingMovements.Peek().ReadyToMove(_owner.HeadLocation))
            {
                PendingMovement currentMovement = _pendingMovements.Dequeue();
                applyMovement(currentMovement);

                // If there's another movement in the queue
                if (_pendingMovements.Count > 0)
                {
                    PendingMovement nextMovement = _pendingMovements.Peek();
                    nextMovement.StartLocation = _owner.MovementController.Position;
                    nextMovement.CurrentMapLocation = _owner.HeadLocation;
                }
            }
        }
    }
}
