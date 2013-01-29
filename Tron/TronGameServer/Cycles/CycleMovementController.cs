using System;
using System.Collections.Generic;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class CycleMovementController : MovementController, IDisposable
    {
        private GameConfiguration _gameConfiguration;
        private Dictionary<double, Vector3> _velocities;

        public CycleMovementController(Vector3 position, Vector3 velocity, double rotation, GameConfiguration gameConfiguration)
            : base(position, velocity, Math.Round(rotation, 4))
        {
            _gameConfiguration = gameConfiguration;
            // There aren't many velocities we can have so calculate them prior to cycle activation
            calculateVelocities();
        }

        public Vector3 RequestedPosition { get; set; }

        private void calculateVelocities()
        {
            _velocities = new Dictionary<double, Vector3>();
            _velocities.Add(0, new Vector3(0, 0, -_gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.HALF_PI), new Vector3(-_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
            _velocities.Add(Math.Round(TMath.PI), new Vector3(0, 0, _gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.ONE_AND_ONE_HALF_PI), new Vector3(_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
        }

        private double stabilizeValue(double position, double velocity, bool wasZero)
        {
            if (velocity.Normalized() * position.Normalized() > 0)
            {
                position -= position % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width;

                if (wasZero)
                {
                    position -= _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * velocity.Normalized();
                }
            }
            else
            {
                if (position != 0)
                {
                    position -= position % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width - _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * position.Normalized();
                }

                if (wasZero)
                {
                    position -= _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * velocity.Normalized();
                }
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
            bool wasZero = false;
            currentPosition = currentPosition.Clone();

            // If our velocity was zero then deterine the velocity based on the current rotation (This happens when we've collided)
            if (Velocity.IsZero())
            {
                wasZero = true;
                currentVelocity = _velocities[Math.Round(Rotation)];
            }
            else
            {
                currentVelocity = Velocity;
            }

            if (currentVelocity.z != 0)
            {
                currentPosition.z = stabilizeValue(currentPosition.z, currentVelocity.z, wasZero);
            }
            else if (currentVelocity.x != 0)
            {
                currentPosition.x = stabilizeValue(currentPosition.x, currentVelocity.x, wasZero);
            }

            return currentPosition;
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
            
            if (Velocity.x != 0)
            {
                Position.x += 1 * Velocity.x.Normalized();
            }
            else
            {
                Position.z += 1 * Velocity.z.Normalized();
            }
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);

            var incrementor = Velocity * gameTime.FractionOfSecond;
            RequestedPosition = Position + incrementor;
        }

        public override void Dispose()
        {
            base.Dispose();
        }
    }
}
