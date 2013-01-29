using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Map2 : IUpdateable, IDisposable
    {
        private Size _halfMapSize;
        private long[,] _map;
        private Size _dimensions;
        private ConcurrentDictionary<long, Cycle> _cycles;
        private MapConfiguration _mapConfiguration;
        private MapUtilities _mapUtilities;

        public Map2(MapConfiguration mapConfiguration)
        {
            _mapConfiguration = mapConfiguration;
            _dimensions = new Size(_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width, _mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height);
            _map = new long[_dimensions.Width, _dimensions.Height];
            _halfMapSize = _mapConfiguration.MAP_SIZE * .5;
            _mapUtilities = new MapUtilities(_mapConfiguration.MAP_SIZE, _mapConfiguration.FLOOR_TILE_SIZE);
        }

        private void updateMapOnMove(object sender, MoveEventArgs e)
        {
            var headLocation = (sender as Cycle).HeadLocation;

            //_map[headLocation.Row, headLocation.Column] = 0;
            Debug.WriteLine("MOVE RECORDED AT: " + headLocation + "   |   " + (sender as Cycle).MovementController.Position);
        }

        private Vector3 validateCycleLocation(Cycle cycle)
        {
            MapLocation currentLocation = _mapUtilities.ToMapLocation(cycle.MovementController.Position),
                        newLocation = _mapUtilities.ToMapLocation(cycle.MovementController.RequestedPosition),
                        inboundLocation = null;
            var difference = new MapLocation(currentLocation.Row - newLocation.Row, currentLocation.Column - newLocation.Column);
            Debug.WriteLine("Validating Cycle Location: " + currentLocation + " => " + newLocation + " |  " + difference);
            int incrementor = 1;

            if (_mapUtilities.RowOutOfBounds(newLocation.Row))
            {
                Debug.WriteLine("COLLISION OOB AT: " + newLocation + "   |   " + cycle.MovementController.RequestedPosition);
                Debug.WriteLine(newLocation + " was out of bounds!");
                if (difference.Row > 0)
                {
                    incrementor = -1;
                }

                do
                {
                    inboundLocation = newLocation = new MapLocation(newLocation.Row - incrementor, newLocation.Column);
                }
                while (_mapUtilities.RowOutOfBounds(newLocation.Row));
                // Allow the cycle to move right to the wall
                inboundLocation.Row += incrementor;
                Debug.WriteLine("Fixed the new location to be: " + inboundLocation);
                cycle.HandleCollisionWith(null);
                difference = new MapLocation(currentLocation.Row - newLocation.Row, currentLocation.Column - newLocation.Column);
            }

            if (_mapUtilities.ColumnOutOfBounds(newLocation.Column))
            {
                Debug.WriteLine("COLLISION OOB AT: " + newLocation + "   |   " + cycle.MovementController.RequestedPosition);
                Debug.WriteLine(newLocation + " was out of bounds!");
                if (difference.Column > 0)
                {
                    incrementor = -1;
                }

                do
                {
                    inboundLocation = newLocation = new MapLocation(newLocation.Row, newLocation.Column - incrementor);
                }
                while (_mapUtilities.ColumnOutOfBounds(newLocation.Column));
                // Allow the cycle to move right to the wall
                inboundLocation.Column += incrementor;

                Debug.WriteLine("Fixed the new location to be: " + inboundLocation);
                cycle.HandleCollisionWith(null);
                difference = new MapLocation(currentLocation.Row - newLocation.Row, currentLocation.Column - newLocation.Column);
            }

            // Check current location vs head location
            if (!currentLocation.SameAs(cycle.HeadLocation) && _map[currentLocation.Row, currentLocation.Column] != 0)
            {
                Debug.WriteLine("Collision found at " + currentLocation + ", it was = " + _map[currentLocation.Row, currentLocation.Column]);
                cycle.HandleCollisionWith(_cycles[_map[currentLocation.Row, currentLocation.Column]]);
                return _mapUtilities.ToPosition(currentLocation, cycle.MovementController.Position.y);
            }

            // Check where we need to fill in the gap
            if (Math.Abs(difference.Row) > 1)
            {
                Debug.WriteLine("Filling Row gap!");
                if (difference.Row > 0)
                {
                    incrementor = -1;
                }

                Debug.WriteLine("For loop fill gap from " + (currentLocation.Row + incrementor) + " to i != " + newLocation.Row + " && !Col Out OF Bounds; i += " + incrementor);
                for (int i = currentLocation.Row + incrementor; i < newLocation.Row && !_mapUtilities.RowOutOfBounds(i); i += incrementor)
                {
                    Debug.WriteLine("Checking collision at ( " + i + ", " + currentLocation.Column + " ) = " + _map[i, currentLocation.Column]);
                    if (_map[i, currentLocation.Column] != 0) // This is a new location
                    {
                        Debug.WriteLine("Collision found at: ( " + i + ", " + currentLocation.Column + " ) which was = " + _map[i, currentLocation.Column]);
                        return _mapUtilities.ToPosition(new MapLocation(i, currentLocation.Column), cycle.MovementController.Position.y);
                    }
                }
            }

            if (Math.Abs(difference.Column) > 1)
            {
                Debug.WriteLine("Filling Column gap!");
                if (difference.Column > 0)
                {
                    incrementor = -1;
                }

                Debug.WriteLine("For loop fill gap from " + (currentLocation.Column + incrementor) + " to i != " + newLocation.Column + " && !Col Out OF Bounds; i += " + incrementor);
                for (int i = currentLocation.Column + incrementor; i != newLocation.Column && !_mapUtilities.ColumnOutOfBounds(i); i += incrementor)
                {
                    Debug.WriteLine("Checking collision at ( " + currentLocation.Row + ", " + i + " ) = " + _map[currentLocation.Row, i]);
                    if (_map[currentLocation.Row, i] != 0) // This is a new location
                    {
                        Debug.WriteLine("Collision found at: ( " + currentLocation.Row + ", " + i + " ) which was = " + _map[currentLocation.Row, i]);
                        return _mapUtilities.ToPosition(new MapLocation(currentLocation.Row, i), cycle.MovementController.Position.y);
                    }
                }
            }

            if (inboundLocation == null)
            {
                Debug.Write("Wasn't out of bounds: " + cycle.MovementController.Position + " => " + cycle.MovementController.RequestedPosition);
                if (_mapUtilities.XOutOfBounds(cycle.MovementController.RequestedPosition.x))
                {
                    Debug.Write(" X ");
                    cycle.MovementController.RequestedPosition.x = Math.Min(Math.Max(cycle.MovementController.RequestedPosition.x, -_halfMapSize.Width), _halfMapSize.Width);
                    cycle.HandleCollisionWith(null);
                }
                if (_mapUtilities.ZOutOfBounds(cycle.MovementController.RequestedPosition.z))
                {
                    Debug.Write(" Z ");
                    cycle.MovementController.RequestedPosition.z = Math.Min(Math.Max(cycle.MovementController.RequestedPosition.z, -_halfMapSize.Height), _halfMapSize.Height);
                    cycle.HandleCollisionWith(null);
                }

                Debug.WriteLine(" => " + cycle.MovementController.RequestedPosition);
                return cycle.MovementController.RequestedPosition;
            }
            else
            {
                Debug.WriteLine("WAS out of bounds: " + cycle.MovementController.Position);
                return _mapUtilities.ToPosition(inboundLocation, cycle.MovementController.Position.y);
            }
        }

        private void fillMapSpace(MapLocation currentLocation, MapLocation newLocation, long fillValue)
        {
            var difference = new MapLocation(currentLocation.Row - newLocation.Row, currentLocation.Column - newLocation.Column);
            int incrementor;

            // Check where we need to fill in the gap
            if (Math.Abs(difference.Row) > 0)
            {
                incrementor = difference.Row.Normalized() * -1;

                for (int i = currentLocation.Row; i != newLocation.Row; i += incrementor)
                {
                    Debug.WriteLine("MARKING: ( " + i + ", " + currentLocation.Column + " ) with " + fillValue + ", was " + _map[i, currentLocation.Column]);
                    _map[i, currentLocation.Column] = fillValue;
                }
            }

            if (Math.Abs(difference.Column) > 0)
            {
                incrementor = difference.Column.Normalized() * -1;

                for (int i = currentLocation.Column; i != newLocation.Column; i += incrementor)
                {
                    Debug.WriteLine("MARKING: ( " + currentLocation.Row + ", " + i + " ) with " + fillValue + ", was " + _map[currentLocation.Row, i]);
                    _map[currentLocation.Row, i] = fillValue;
                }
            }
        }

        public void RegisterCycles(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;

            foreach (var cycle in cycles.Values)
            {
                cycle.OnMove += updateMapOnMove;
                cycle.HeadLocation = _mapUtilities.GetCycleMapLocation(cycle);
            }
        }

        public long Get(MapLocation location)
        {
            return _map[location.Row, location.Column];
        }

        public bool Empty(MapLocation location)
        {
            return !_mapUtilities.OutOfBounds(location) && _map[location.Row, location.Column] == 0;
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                if (cycle.Alive && !cycle.Colliding)
                {
                    // Update the cycle's position, accept it's request
                    MapLocation quadrant = _mapUtilities.ToMapLocation(cycle.MovementController.GetLinePosition(cycle.MovementController.RequestedPosition));
                    Debug.WriteLine("Pos: " + cycle.MovementController.Position + ", QUAD: " + quadrant + ", HEAD LOC: " + cycle.HeadLocation);
                    //if (!quadrant.SameAs(cycle.HeadLocation))
                    //{
                    Debug.WriteLine("A - " + cycle.MovementController.RequestedPosition);
                    cycle.MovementController.ConfirmPositionRequest(validateCycleLocation(cycle));
                    /*}
                    else
                    {
                        Debug.WriteLine("B - " + cycle.MovementController.RequestedPosition);
                        cycle.MovementController.ConfirmPositionRequest();
                    }*/

                    quadrant = _mapUtilities.GetCycleMapLocation(cycle);
                    long currentLocation = _map[quadrant.Row, quadrant.Column];

                    if (currentLocation == 0) // Spot is empty on map, mark it as ours
                    {
                        Debug.Write(cycle.MovementController.Position + "/" + quadrant + "  |   ");
                        // Fill in the map
                        fillMapSpace(cycle.HeadLocation, quadrant, cycle.ID);

                        cycle.HeadLocation = quadrant;
                        // We mark it with the negated cycle ID because it represents the head of our trail
                        Debug.WriteLine("MARKING: " + quadrant + " with " + -cycle.ID);
                        _map[quadrant.Row, quadrant.Column] = -cycle.ID;
                    }
                    else // Possibly a Collision
                    {
                        // Verify we're not running into ourself when going through a quadrant.
                        if (currentLocation != -cycle.ID && !cycle.Colliding)
                        {
                            Debug.WriteLine("COLLISION AT: " + quadrant + "   |   " + cycle.MovementController.Position);
                            cycle.HandleCollisionWith(_cycles[Math.Abs(currentLocation)]);
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
                cycle.OnMove -= updateMapOnMove;
            }

            _cycles = null;
            _mapUtilities.Dispose();
        }
    }
}
