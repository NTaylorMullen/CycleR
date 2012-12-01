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
        private MapConfiguration _mapConfiguration;

        public Map(IEnumerable<KeyValuePair<long, Cycle>> cycles, MapConfiguration mapConfiguration)
        {
            _mapConfiguration = mapConfiguration;
            _map = new long[_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width, _mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height];
            _cycles = new ConcurrentDictionary<long,Cycle>(cycles);

            foreach (var cycle in _cycles.Values)
            {
                cycle.HeadLocation = GetCycleMapLocation(cycle);
            }
        }

        public MapLocation GetCycleMapLocation(Cycle cycle)
        {
            Vector3 mapLocation = cycle.MovementController.Position.Clone();            

            // Get cycle position as if it were about to turn (aka positioned on line).  This will also ensure that a cycle will be
            // viewed as dead as soon as the front of the cycle hits a line.
            if (cycle.MovementController.Velocity.z != 0)
            {
                mapLocation.z -= (mapLocation.z % _mapConfiguration.FLOOR_TILE_SIZE.Width) - _mapConfiguration.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.z / Math.Abs(cycle.MovementController.Velocity.z));
            }
            else if (cycle.MovementController.Velocity.x != 0)
            {
                mapLocation.x -= (mapLocation.x % _mapConfiguration.FLOOR_TILE_SIZE.Width) - _mapConfiguration.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.x / Math.Abs(cycle.MovementController.Velocity.x));
            }

            // Normalize to the quadrant in which the cycle lies
            MapLocation quadrant = new MapLocation(Math.Abs(mapLocation.x / _mapConfiguration.FLOOR_TILE_SIZE.Width) - 1, Math.Abs(mapLocation.z / _mapConfiguration.FLOOR_TILE_SIZE.Height) - 1);

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
