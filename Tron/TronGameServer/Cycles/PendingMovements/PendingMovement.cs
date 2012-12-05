using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class PendingMovement : IDisposable
    {
        public PendingMovement(MapLocation currentMapLocation, Vector3 startLocation, CycleMovementFlag direction)
        {
            CurrentMapLocation = currentMapLocation;
            StartLocation = startLocation;
            Direction = direction;
        }

        public Vector3 StartLocation { get; set; }
        public CycleMovementFlag Direction { get; set; }
        public MapLocation CurrentMapLocation { get; set; }
        public bool Disposed { get; private set; }

        public bool ReadyToMove(MapLocation currentLocation)
        {
            return !CurrentMapLocation.SameAs(currentLocation);
        }

        public void Dispose()
        {
            Disposed = true;
            StartLocation = null;
            CurrentMapLocation = null;
        }
    }
}
