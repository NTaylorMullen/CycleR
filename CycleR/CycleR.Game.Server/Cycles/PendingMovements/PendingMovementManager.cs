using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace CycleR.Game.Server
{
    public class PendingMovementManager : IUpdateable, IDisposable
    {
        public const int MAX_MOVEMENTS_IN_QUEUE = 2;

        private Cycle _owner;
        private ConcurrentQueue<PendingMovement> _pendingMovements;

        public PendingMovementManager(Cycle owner)
        {
            _owner = owner;
            _pendingMovements = new ConcurrentQueue<PendingMovement>();
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
            PendingMovement pendingMovement;
            _pendingMovements.TryPeek(out pendingMovement);

            if (_pendingMovements.Count > 0 && pendingMovement.ReadyToMove(_owner))
            {
                PendingMovement currentMovement;
                _pendingMovements.TryDequeue(out currentMovement);
                applyMovement(currentMovement);

                // If there's another movement in the queue
                if (_pendingMovements.Count > 0)
                {
                    PendingMovement nextMovement;
                    _pendingMovements.TryPeek(out nextMovement);
                    nextMovement.StartLocation = _owner.MovementController.Position;
                    nextMovement.CurrentMapLocation = _owner.MovementController.HeadLocation;
                }
            }
        }

        public void Dispose()
        {
            PendingMovement garbage;

            _owner = null;
            while (!_pendingMovements.IsEmpty)
            {
                _pendingMovements.TryDequeue(out garbage);
            }
            _pendingMovements = null;
        }
    }
}
