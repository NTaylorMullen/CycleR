using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tron.GameServer
{
    public class CollisionChecker
    {
        private Map _map;
        private MapUtilities _utilities;

        public CollisionChecker(Map map, MapUtilities utilities)
        {
            _map = map;
            _utilities = utilities;
        }

        public void ValidateCollision(Cycle cycle)
        {
            var cycleLocation = _utilities.ToMapLocation(cycle.MovementController.Position);
            long occupiedById = _map[cycleLocation];

            // Check if we're out of bounds
            if (_utilities.OutOfBounds(cycleLocation))
            {
                cycle.HandleCollisionWith(null);
            }
            else if (occupiedById != 0 && occupiedById != -cycle.ID) // Check if we're colliding with something other than our head location
            {
                Cycle occupiedBy = _map.GetCycle(Math.Abs(occupiedById));

                cycle.HandleCollisionWith(occupiedBy);
            }
        }
    }
}
