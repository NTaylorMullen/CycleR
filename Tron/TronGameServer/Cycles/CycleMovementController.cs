using System;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class CycleMovementController : MovementController, IDisposable
    {
        private GameConfiguration _gameConfiguration;
        private Dictionary<double, Vector3> _velocities;
        private Map _map;

        public CycleMovementController(Vector3 position, Vector3 velocity, double rotation, Map map, GameConfiguration gameConfiguration)
            : base(position, velocity, Math.Round(rotation, 4))
        {
            _gameConfiguration = gameConfiguration;
            _map = map;
            // There aren't many velocities we can have so calculate them prior to cycle activation
            calculateVelocities();
        }

        public Vector3 RequestedPosition { get; set; }
        public MapLocation HeadLocation { get; set; }

        private void calculateVelocities()
        {
            _velocities = new Dictionary<double, Vector3>();
            _velocities.Add(0, new Vector3(0, 0, -_gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.HALF_PI), new Vector3(-_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
            _velocities.Add(Math.Round(TMath.PI), new Vector3(0, 0, _gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.ONE_AND_ONE_HALF_PI), new Vector3(_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
        }

        private double stabilizeValue(double position, double velocity)
        {
            if (velocity.Normalized() * position.Normalized() > 0)
            {
                position -= position % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width;
            }
            else if(position != 0)
            {
                position -= position % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width - _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * position.Normalized();
            }

            return position;
        }

        private void positionOnLine()
        {
            Position = GetLinePosition(Position);
        }

        public void ConfirmPositionRequest(Vector3 alteredPosition = null)
        {
            Position = alteredPosition ?? RequestedPosition;
            RequestedPosition = null;
        }

        public Vector3 GetLinePosition(Vector3 currentPosition)
        {
            Vector3 currentVelocity;
            currentPosition = currentPosition.Clone();

            // If our velocity was zero then reset position to where our head location is
            if (Velocity.IsZero())
            {
                return _map.Utilities.ToPosition(HeadLocation, currentPosition.y);
            }
            else
            {
                currentVelocity = Velocity;
            }
            
            if (currentVelocity.z != 0)
            {
                currentPosition.z = stabilizeValue(currentPosition.z, currentVelocity.z);
            }
            else if (currentVelocity.x != 0)
            {
                currentPosition.x = stabilizeValue(currentPosition.x, currentVelocity.x);
            }

            return currentPosition;
        }

        public bool CanMove(MovementFlag direction)
        {
            return GetValidMovements().Contains(direction);
        }

        public List<MovementFlag> GetValidMovements()
        {
            var validMovements = new List<MovementFlag>();
            var rotation = Math.Round(Rotation);
            var locationCheck = HeadLocation.Clone();

            if (rotation == 0) // Going up
            {
                locationCheck.Column--;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Column += 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 2) // Going Left
            {
                locationCheck.Row++;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Row -= 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 3) // Going Down
            {
                locationCheck.Column++;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Column -= 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }
            else if (rotation == 5) // Going Right
            {
                locationCheck.Row--;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Left);
                }

                locationCheck.Row += 2;
                if (_map.Empty(locationCheck))
                {
                    validMovements.Add(MovementFlag.Right);
                }
            }

            return validMovements;
        }

        public void Move(MovementFlag direction)
        {
            positionOnLine();

            if (direction == MovementFlag.Left)
            {
                Rotation = (Rotation + TMath.HALF_PI) % TMath.TWO_PI;

                if(Math.Round(Rotation) == 6) // Above two pi
                {
                    Rotation = 0;
                }
            }
            else if (direction == MovementFlag.Right)
            {
                Rotation -= TMath.HALF_PI;

                if (Rotation < 0)
                {
                    if (Math.Round(Rotation) == 0) 
                    {
                        Rotation = 0;
                    }
                    else
                    {
                        Rotation += TMath.TWO_PI;
                    }
                }
            }

            Velocity = _velocities[Math.Round(Rotation)];           
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);

            var incrementor = Velocity * gameTime.FractionOfSecond;
            RequestedPosition = Position + incrementor;
        }

        public override void Dispose()
        {
            _map = null;
            _gameConfiguration = null;
            _velocities.Clear();
            _velocities = null;
            base.Dispose();
        }
    }
}
