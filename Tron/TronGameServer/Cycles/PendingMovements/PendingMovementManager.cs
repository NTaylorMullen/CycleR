using System;
using System.Collections.Generic;

namespace Tron.GameServer
{
    public class PendingMovementManager : IUpdateable, IDisposable
    {
        public const int MAX_MOVEMENTS_IN_QUEUE = 2;

        private Cycle _owner;
        private Queue<PendingMovement> _pendingMovements;

        public PendingMovementManager(Cycle owner)
        {
            _owner = owner;
            _pendingMovements = new Queue<PendingMovement>();
        }

        private void applyMovement(PendingMovement movement)
        {
            if (_owner.MovementController.CanMove(movement.Direction))
            {
                // _owner.MovementController.Position = movement.StartLocation;
                _owner.Move(movement.Direction);
            }
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
            if (_pendingMovements.Count > 0 && _pendingMovements.Peek().ReadyToMove(_owner))
            {
                PendingMovement currentMovement = _pendingMovements.Dequeue();
                applyMovement(currentMovement);

                // If there's another movement in the queue
                if (_pendingMovements.Count > 0)
                {
                    PendingMovement nextMovement = _pendingMovements.Peek();
                    nextMovement.StartLocation = _owner.MovementController.Position;
                    nextMovement.CurrentMapLocation = _owner.MovementController.HeadLocation;
                }
            }
        }

        public void Dispose()
        {
            _owner = null;
            _pendingMovements.Clear();
            _pendingMovements = null;
        }
    }
}
