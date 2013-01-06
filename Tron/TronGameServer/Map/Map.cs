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
            _dimensions = new Size(_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width, _mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height);
            _map = new long[_dimensions.Width, _dimensions.Height];
        }

        public void RegisterCycles(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;

            foreach (var cycle in cycles.Values)
            {
                cycle.OnMove += UpdateMapOnMove;
                cycle.HeadLocation = getCycleMapLocation(cycle);
            }
        }

        private void UpdateMapOnMove(object sender, MoveEventArgs e)
        {
            var headLocation = (sender as Cycle).HeadLocation;

            //_map[headLocation.Row, headLocation.Column] = 0;
            Debug.WriteLine("MOVE RECORDED AT: " + headLocation + "   |   " + (sender as Cycle).MovementController.Position);
        }

        private MapLocation getCycleMapLocation(Cycle cycle)
        {
            var mapLocation = cycle.MovementController.getLinePosition();

            // Normalize to the quadrant in which the cycle lies
            MapLocation quadrant = new MapLocation(Math.Abs((mapLocation.z + _halfMapSize.Height) / _mapConfiguration.FLOOR_TILE_SIZE.Height), Math.Abs((mapLocation.x + _halfMapSize.Width) / _mapConfiguration.FLOOR_TILE_SIZE.Width));

            return quadrant;
        }

        private void fillMapSpace(MapLocation currentLocation, MapLocation newLocation, long fillValue)
        {
            var difference = new MapLocation(currentLocation.Row - newLocation.Row, currentLocation.Column - newLocation.Column);
            int incrementor;

            // Check where we need to fill in the gap
            if (Math.Abs(difference.Row) > 0)
            {
                incrementor = difference.Row / Math.Abs(difference.Row) * -1;

                for (int i = currentLocation.Row; i != newLocation.Row; i += incrementor)
                {
                    Debug.WriteLine("MARKING: ( " + i + ", " + currentLocation.Column + " ) with " + fillValue);
                    _map[i, currentLocation.Column] = fillValue;
                }
            }

            if (Math.Abs(difference.Column) > 0)
            {
                incrementor = difference.Column / Math.Abs(difference.Column) * -1;

                for (int i = currentLocation.Column; i != newLocation.Column; i += incrementor)
                {
                    Debug.WriteLine("MARKING: ( " + currentLocation.Row + ", " + i + " ) with " + fillValue);
                    _map[currentLocation.Row, i] = fillValue;
                }
            }
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
                            Debug.Write(cycle.MovementController.Position + "  |   ");
                            // Fill in the map
                            fillMapSpace(cycle.HeadLocation, quadrant, cycle.ID);

                            cycle.HeadLocation = quadrant;
                            // We mark it with the negated cycle ID because it represents the head of our trail
                            _map[quadrant.Row, quadrant.Column] = -cycle.ID;
                        }
                        else // Possibly a Collision
                        {
                            // Verify we're not running into ourself when going through a quadrant.
                            if (currentLocation != -cycle.ID)
                            {
                                // Check if we're not already colliding with something
                                if (!cycle.Colliding)
                                {
                                    if (!cycle.MovementController.Velocity.IsZero())
                                    {
                                        Debug.WriteLine("COLLISION AT: " + quadrant + "   |   " + cycle.MovementController.Position);
                                    }
                                    cycle.HandleCollisionWith(_cycles[Math.Abs(currentLocation)]);
                                }
                            }
                        }
                    }
                }
            }
        }

        public void Dispose()
        {
            _map = null;

            foreach (var cycle in _cycles.Values)
            {
                cycle.OnMove -= UpdateMapOnMove;
            }

            _cycles = null;
        }
    }
}
