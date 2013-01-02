﻿using System;
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

        private void calculateVelocities()
        {
            _velocities = new Dictionary<double, Vector3>();
            _velocities.Add(0, new Vector3(0, 0, -_gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.HALF_PI), new Vector3(-_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
            _velocities.Add(Math.Round(TMath.PI), new Vector3(0, 0, _gameConfiguration.CycleConfig.MAX_SPEED));
            _velocities.Add(Math.Round(TMath.ONE_AND_ONE_HALF_PI), new Vector3(_gameConfiguration.CycleConfig.MAX_SPEED, 0, 0));
        }

        private void positionOnLine()
        {
            Vector3 currentVelocity;
            bool wasZero = false;
            
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
                Position.z -= (Position.z % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width);

                if (wasZero)
                {
                    Position.z -= _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * (currentVelocity.z / Math.Abs(currentVelocity.z));
                }
            }
            else if (currentVelocity.x != 0)
            {
                Position.x -= (Position.x % _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width);

                if (wasZero)
                {
                    Position.x -= _gameConfiguration.MapConfig.FLOOR_TILE_SIZE.Width * (currentVelocity.x / Math.Abs(currentVelocity.x));
                }
            }
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

            var incrementor = Velocity.Clone() * gameTime.FractionOfSecond;
            Position += incrementor;
        }

        public override void Dispose()
        {
            base.Dispose();
        }
    }
}
