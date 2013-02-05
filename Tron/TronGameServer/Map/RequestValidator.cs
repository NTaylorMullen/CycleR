using Tron.Utilities;

namespace Tron.GameServer
{
    public class RequestValidator
    {
        Map _map;
        MapUtilities _utilities;

        public RequestValidator(Map map)
        {
            _map = map;
            _utilities = _map.Utilities;
        }

        private MapLocation validateOutOfBounds(MapLocation headLocation, MapLocation requestedLocation)
        {
            var difference = headLocation - requestedLocation;
            var newLocation = requestedLocation; // No need to clone because we do not change individual members

            if (_utilities.OutOfBounds(newLocation))
            {
                var incrementor = difference.Normalized().Abs();

                // If the requested location is going in the negative direction then we need our incrementor
                // to also be pointing in the negative direction.
                if (difference > 0)
                {
                    incrementor *= -1;
                }

                // Decrement movement position until it is no longer out of bounds
                do
                {
                    newLocation = newLocation - incrementor;
                }
                while (_utilities.OutOfBounds(newLocation));

                // If we're back at our head location then we need to set the position to be out of bounds (by one) (collision)
                if (newLocation.SameAs(headLocation))
                {
                    newLocation += incrementor;
                }
            }

            return newLocation;
        }

        private MapLocation validateCycleCollisions(MapLocation headLocation, MapLocation requestedLocation)
        {
            var difference = headLocation - requestedLocation;
            var newLocation = requestedLocation; // No need to clone because we do not change individual members

            // If we have a gap greater than 1 then we need to fill it in
            if (difference.Abs() > 1)
            {
                var incrementor = difference.Normalized().Abs();

                // If the requested location is going in the negative direction then we need our incrementor
                // to also be pointing in the negative direction.
                if (difference > 0)
                {
                    incrementor *= -1;
                }

                var incrementorSquared = incrementor * incrementor;
                // We set i = the headlocation + incrementor, the headLocation * incrementor^2 is to ensure that either the row or column is 0'd out
                int start = (headLocation * incrementorSquared + incrementor).NonZeroValue(); // Start one ahead of head location                
                int end = (newLocation * incrementorSquared).NonZeroValue(); // End at new location
                int singleIncrementor = incrementor.NonZeroValue(); // Convert incrementer to single value
                var startLocation = headLocation + incrementor;
                int totalIncrements = 0;

                for (int i = start; i <= end; i += singleIncrementor)
                {
                    // Add how far we are along to the headlocation and use that as the checking point
                    var checkLocation = startLocation + incrementor * totalIncrements;

                    // Check if the location we're checking is already occupied.  If it is then we had a collision and we've found a new Position
                    if (_map[checkLocation] != 0)
                    {
                        return checkLocation;
                    }

                    totalIncrements++;
                }
            }

            // Everything was ok with the position, return it!
            return newLocation;
        }

        public void ValidateRequestedPosition(Cycle cycle)
        {
            var requestedLocation = _utilities.ToMapLocation(cycle.MovementController.RequestedPosition);

            // We only want to run logic against the cycle if it's potential new MovementController.HeadLocation has changed.
            if (!cycle.MovementController.HeadLocation.SameAs(requestedLocation))
            {
                var newLocation = validateOutOfBounds(cycle.MovementController.HeadLocation, _utilities.ToMapLocation(cycle.MovementController.RequestedPosition));
                newLocation = validateCycleCollisions(cycle.MovementController.HeadLocation, newLocation);

                // If our new location is now different from our request location, we need to change the confirmation,
                // otherwise we need to convert the newLocation to a position and confirm it that way.
                if (requestedLocation.SameAs(newLocation))
                {
                    cycle.MovementController.ConfirmPositionRequest();
                }
                else
                {
                    cycle.MovementController.ConfirmPositionRequest(_utilities.ToPosition(newLocation, cycle.MovementController.Position.y));
                }
            }
            else
            {
                // If our position request has not differed from our current head location then just confirm it
                cycle.MovementController.ConfirmPositionRequest();
            }
        }
    }
}
