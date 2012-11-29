using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Map : IUpdateable, IDisposable
    {
        private long[,] _map;
        private ConcurrentDictionary<long, Cycle> _cycles;

        public Map(IEnumerable<KeyValuePair<long, Cycle>> cycles)
        {
            _map = new long[MapConfiguration.MAP_SIZE.Width / MapConfiguration.FLOOR_TILE_SIZE.Width, MapConfiguration.MAP_SIZE.Height / MapConfiguration.FLOOR_TILE_SIZE.Height];
            _cycles = new ConcurrentDictionary<long,Cycle>(cycles);
        }

        public static MapLocation GetCycleMapLocation(Cycle cycle)
        {
            Vector3 mapLocation = cycle.MovementController.Position.Clone();            

            // Get cycle position as if it were about to turn (aka positioned on line).  This will also ensure that a cycle will be
            // viewed as dead as soon as the front of the cycle hits a line.
            if (cycle.MovementController.Velocity.Z != 0)
            {
                mapLocation.Z -= (mapLocation.Z % MapConfiguration.FLOOR_TILE_SIZE.Width) - MapConfiguration.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.Z / Math.Abs(cycle.MovementController.Velocity.Z));
            }
            else if (cycle.MovementController.Velocity.X != 0)
            {
                mapLocation.X -= (mapLocation.X % MapConfiguration.FLOOR_TILE_SIZE.Width) - MapConfiguration.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.X / Math.Abs(cycle.MovementController.Velocity.X));
            }

            // Normalize to the quadrant in which the cycle lies
            MapLocation quadrant = new MapLocation((mapLocation.X / MapConfiguration.FLOOR_TILE_SIZE.Width) - 1, (mapLocation.Z / MapConfiguration.FLOOR_TILE_SIZE.Height) - 1);

            return quadrant;
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                if (cycle.Alive)
                {
                    MapLocation quadrant = GetCycleMapLocation(cycle);
                    long currentLocation = _map[quadrant.Column, quadrant.Row];

                    if (currentLocation == 0) // Spot is empty on map, mark it as ours
                    {
                        // Set the last head location to a positive cycle ID, indicating we can now run into it
                        _map[cycle.HeadLocation.Column, cycle.HeadLocation.Row] = cycle.ID;
                        cycle.HeadLocation = quadrant;
                        // We mark it with the negated cycle ID because it represents the head of our trail
                        _map[quadrant.Column, quadrant.Row] = -cycle.ID;
                    }
                    else // Possibly a Collision
                    {
                        // Verify we're not running into ourself when going through a quadrant.
                        if (currentLocation != -cycle.ID)
                        {
                            // We're runnign into another "head", so handle a collision with both cycles
                            if (currentLocation < 0)
                            {
                                _cycles[Math.Abs(currentLocation)].HandleCollisionWith(cycle);
                            }

                            cycle.HandleCollisionWith(_cycles[Math.Abs(currentLocation)]);
                        }
                    }
                }
            }
        }

        public void Dispose()
        {
            _map = null;
            _cycles.Clear();
            _cycles = null;
        }
    }
}
