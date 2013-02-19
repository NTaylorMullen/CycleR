using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CycleR.Game.Server
{
    public class CollisionChecker
    {
        private Map _map;
        private MapUtilities _utilities;

        public CollisionChecker(Map map)
        {
            _map = map;
            _utilities = _map.Utilities;
        }

        public void ValidateCollision(Cycle cycle)
        {
            var cycleLocation = _utilities.ToMapLocation(cycle.MovementController);
            
            // Check if we're out of bounds
            if (_utilities.OutOfBounds(cycleLocation))
            {
                cycle.HandleCollisionWith(null);
                return;
            }

            long occupiedById = _map[cycleLocation];
            if (occupiedById != 0 && occupiedById != -cycle.ID) // Check if we're colliding with something other than our head location
            {
                Cycle occupiedBy = _map.GetCycle(Math.Abs(occupiedById));

                cycle.HandleCollisionWith(occupiedBy);
            }
        }
    }
}
