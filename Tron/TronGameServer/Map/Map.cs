using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Map : IUpdateable, IDisposable
    {
        private Size _halfMapSize;
        private long[,] _map;
        private Size _dimensions;
        private ConcurrentDictionary<long, Cycle> _cycles;
        private MapConfiguration _mapConfiguration;

        public Map(MapConfiguration mapConfiguration)
        {            
            _mapConfiguration = mapConfiguration;
            _halfMapSize = _mapConfiguration.MAP_SIZE * .5;
            _dimensions = new Size(_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width,_mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height);
            _map = new long[_dimensions.Width, _dimensions.Height];            
        }

        public void RegisterCycles(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;

            foreach (var cycle in cycles.Values)
            {
                cycle.HeadLocation = getCycleMapLocation(cycle);
            }
        }

        private MapLocation getCycleMapLocation(Cycle cycle)
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
            MapLocation quadrant = new MapLocation(Math.Abs((mapLocation.z + _halfMapSize.Height) / _mapConfiguration.FLOOR_TILE_SIZE.Height), Math.Abs((mapLocation.x + _halfMapSize.Width) / _mapConfiguration.FLOOR_TILE_SIZE.Width));

            return quadrant;
        }

        public long Get(MapLocation location)
        {
            return _map[location.Row, location.Column];
        }

        public bool OutOfBounds(MapLocation location)
        {
            return location.Row < 0 || location.Column < 0 || location.Row >= _dimensions.Height || location.Column >= _dimensions.Width;
        }

        public bool Empty(MapLocation location)
        {
            return !OutOfBounds(location) && _map[location.Row, location.Column] == 0;
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                if (cycle.Alive)
                {
                    MapLocation quadrant = getCycleMapLocation(cycle);

                    if (quadrant.Row < 0 || quadrant.Row >= _dimensions.Height || quadrant.Column < 0 || quadrant.Column >= _dimensions.Width)
                    {
                        cycle.HandleCollisionWith(null);
                    }
                    else
                    {
                        long currentLocation = _map[quadrant.Row, quadrant.Column];

                        if (currentLocation == 0) // Spot is empty on map, mark it as ours
                        {
                            // Set the last head location to a positive cycle ID, indicating we can now run into it
                            _map[cycle.HeadLocation.Row, cycle.HeadLocation.Column] = cycle.ID;
                            cycle.HeadLocation = quadrant;                            
                            // We mark it with the negated cycle ID because it represents the head of our trail
                            _map[quadrant.Row, quadrant.Column] = -cycle.ID;
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
        }

        public void Dispose()
        {
            _map = null;
            _cycles.Clear();
            _cycles = null;
        }
    }
}
