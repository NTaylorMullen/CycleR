using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class Map : IUpdateable, IDisposable
    {
        private MapConfiguration _mapConfiguration;
        private Size _dimensions;
        private ConcurrentDictionary<long, Cycle> _cycles;
        private RequestValidator _requestValidator;
        private CollisionChecker _collisionChecker;
        private MapMarker _mapMarker;
        private long[,] _map;

        public Map(MapConfiguration mapConfiguration)
        {
            _mapConfiguration = mapConfiguration;
            _dimensions = new Size(_mapConfiguration.MAP_SIZE.Width / _mapConfiguration.FLOOR_TILE_SIZE.Width, _mapConfiguration.MAP_SIZE.Height / _mapConfiguration.FLOOR_TILE_SIZE.Height);
            _map = new long[_dimensions.Width, _dimensions.Height];
            Utilities = new MapUtilities(_mapConfiguration.MAP_SIZE, _mapConfiguration.FLOOR_TILE_SIZE);
            _requestValidator = new RequestValidator(this);
            _collisionChecker = new CollisionChecker(this);
            _mapMarker = new MapMarker(this);
        }

        public MapUtilities Utilities { get; set; }

        private void updateHeadLocation(object sender, EventArgs e)
        {
            var cycle = sender as Cycle;
            cycle.MovementController.HeadLocation = Utilities.ToMapLocation(cycle.MovementController);
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
                cycle.OnMove += updateMoveLocation;
                cycle.OnCollision += onCollision;
                cycle.OnForcedPositionChange += updateHeadLocation;
                cycle.MovementController.HeadLocation = Utilities.GetCycleMapLocation(cycle);
            }
        }

        private void onCollision(object sender, CollisionEventArgs e)
        {
            Debug.WriteLine("Collision at " + Utilities.ToMapLocation((sender as Cycle).MovementController));
        }

        private void updateMoveLocation(object sender, MoveEventArgs e)
        {
            Debug.WriteLine("MOVE RECORDED AT " + (sender as Cycle).MovementController.Position);
        }

        public bool Empty(MapLocation location)
        {
            return !Utilities.OutOfBounds(location) && _map[location.Row, location.Column] == 0;
        }

        public void Update(GameTime gameTime)
        {
            foreach (var cycle in _cycles.Values)
            {
                // If the cycle is Colliding then the position hasn't changed and we've already dealt with it
                if (!cycle.Colliding)
                {
                    Debug.WriteLine("Cycle at: " + cycle.MovementController.HeadLocation + " is requesting to be at " + Utilities.ToMapLocation(cycle.MovementController.RequestedPosition, cycle.MovementController.Velocity) + " | " + cycle.MovementController.Position + " => " + cycle.MovementController.RequestedPosition);
                    // Validate the requested position on the cycle, updates the cycles position
                    _requestValidator.ValidateRequestedPosition(cycle);
                    _collisionChecker.ValidateCollision(cycle);

                    Debug.WriteLine("Cycle now at: " + Utilities.ToMapLocation(cycle.MovementController) + " | " + cycle.MovementController.Position);

                    var newLocation = Utilities.ToMapLocation(cycle.MovementController);

                    // If our current location is colliding then we need our MovementController.HeadLocation to be just before the
                    // collision location mark.
                    if (cycle.Colliding)
                    {
                        Debug.Write("Cycle was colliding at: " + Utilities.ToMapLocation(cycle.MovementController) + " and new location is " + newLocation);
                        var difference = cycle.MovementController.HeadLocation - newLocation;
                        var incrementor = difference.Normalized().Abs();

                        Debug.WriteLine(" and incrementor = " + incrementor);

                        // If the requested location is going in the negative direction then we need our incrementor
                        // to also be pointing in the negative direction.
                        if (difference > 0)
                        {
                            incrementor *= -1;
                        }

                        newLocation -= incrementor;
                    }

                    Debug.Write("Checking if cycles head location " + cycle.MovementController.HeadLocation + " differs from " + newLocation + " = ");
                    // We only need to perform markings if we've moved from our location
                    if (!cycle.MovementController.HeadLocation.SameAs(newLocation))
                    {
                        Debug.WriteLine("TRUE");
                        var distance = cycle.MovementController.HeadLocation - newLocation;

                        // used by mark location to 
                        bool inclusive = true;

                        if (cycle.Colliding)
                        {
                            // If we're 1 away from the head location while colliding, no need to mark anything, just noop
                            if (distance.NonZeroValue() == 1)
                            {
                                this[cycle.MovementController.HeadLocation] = cycle.ID;
                                this[newLocation] = -cycle.ID;
                                cycle.MovementController.HeadLocation = newLocation;
                                continue;
                            }

                            inclusive = false;
                        }

                        // Fills in any unmarked spots between the last head location and the current new location
                        _mapMarker.MarkArea(cycle.MovementController.HeadLocation, newLocation, cycle.ID, inclusive);

                        // Update the headlocation
                        Debug.WriteLine("Marking old MovementController.HeadLocation: " + cycle.MovementController.HeadLocation + " as " + cycle.ID + " and new MovementController.HeadLocation: " + newLocation + " as " + -cycle.ID);
                        this[cycle.MovementController.HeadLocation] = cycle.ID;
                        this[newLocation] = -cycle.ID;
                        cycle.MovementController.HeadLocation = newLocation;
                    }
                    else
                    {
                        Debug.WriteLine("FALSE");
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

            foreach (var cycle in _cycles.Values)
            {
                cycle.OnForcedPositionChange -= updateHeadLocation;
            }

            _cycles = null;
            Utilities.Dispose();
        }
    }
}
