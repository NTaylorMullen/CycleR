using System;
using System.Collections.Concurrent;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class Map : IUpdateable, IDisposable
    {
        private MapConfiguration _mapConfiguration;
        private MapUtilities _utilities;
        private Size _dimensions;
        private ConcurrentDictionary<long, Cycle> _cycles;
        private RequestValidator _requestValidator;
        private CollisionChecker _collisionChecker;
        private long[,] _map;

        public Map(MapConfiguration mapConfiguration)
        {
            _mapConfiguration = mapConfiguration;
            _dimensions = new Size(_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width, _mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height);
            _map = new long[_dimensions.Width, _dimensions.Height];
            _utilities = new MapUtilities(_mapConfiguration.MAP_SIZE, _mapConfiguration.FLOOR_TILE_SIZE);
            _requestValidator = new RequestValidator(this, _utilities);
            _collisionChecker = new CollisionChecker(this, _utilities);
        }

        private void fillMapSpace(MapLocation headLocation, MapLocation newLocation, long fillValue, bool inclusive)
        {
            var difference = headLocation - newLocation;
            var incrementor = new MapLocation(1, 1);

            // Check where we need to fill in the gap
            if (difference.Abs() > 1)
            {
                // If the requested location is going in the negative direction then we need our incrementor
                // to also be pointing in the negative direction.
                if (difference > 0)
                {
                    incrementor *= difference.Normalized() * -1;
                }

                // We do not want to mark the current location because that's the new head location, so step back one
                newLocation -= incrementor;

                // If we're not inclusive then we want to step back one more (chances are our actual position is out of bounds)
                if (!inclusive)
                {
                    newLocation -= incrementor;
                }

                for (MapLocation i = headLocation; !i.SameAs(newLocation); i += incrementor)
                {
                    _map[i.Row, i.Column] = fillValue;
                }
            }
        }

        public void Clear()
        {
            _map = new long[_dimensions.Width, _dimensions.Height];
        }

        public void RegisterCycles(ConcurrentDictionary<long, Cycle> cycles)
        {
            _cycles = cycles;

            foreach (var cycle in cycles.Values)
            {
                cycle.HeadLocation = _utilities.GetCycleMapLocation(cycle);
            }
        }

        public bool Empty(MapLocation location)
        {
            return !_utilities.OutOfBounds(location) && _map[location.Row, location.Column] == 0;
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                // If the cycle is Colliding then the position hasn't changed and we've already dealt with it
                if (!cycle.Colliding)
                {
                    // Validate the requested position on the cycle, updates the cycles position
                    _requestValidator.ValidateRequestedPosition(cycle);
                    _collisionChecker.ValidateCollision(cycle);

                    var newLocation = _utilities.ToMapLocation(cycle.MovementController.Position);

                    // We only need to perform markings if we've moved from our location
                    if (!cycle.HeadLocation.SameAs(newLocation))
                    {
                        var distance = cycle.HeadLocation - newLocation;

                        // used by mark location to 
                        bool inclusive = true;

                        if (cycle.Colliding)
                        {
                            // If we're 1 away from the head location while colliding, no need to mark anything, just noop
                            if (distance.NonZeroValue() ==  1)
                            {
                                continue;
                            }

                            inclusive = false;
                        }

                        // Fills in any unmarked spots between the last head location and the current new location
                        fillMapSpace(cycle.HeadLocation, newLocation, cycle.ID, inclusive);

                        // Update the headlocation
                        this[cycle.HeadLocation] = cycle.ID;
                        this[newLocation] = -cycle.ID;
                        cycle.HeadLocation = newLocation;
                    }
                }
            }
        }

        public Cycle GetCycle(long id)
        {
            return _cycles[id];
        }

        public long this[int i, int j]
        {
            get
            {
                return _map[i, j];
            }
            set
            {
                _map[i, j] = value;
            }
        }

        public long this[MapLocation i]
        {
            get
            {
                return _map[i.Row, i.Column];
            }
            set
            {
                _map[i.Row, i.Column] = value;
            }
        }

        public void Dispose()
        {
            _map = null;
            _cycles = null;
            _utilities.Dispose();
        }
    }
}
