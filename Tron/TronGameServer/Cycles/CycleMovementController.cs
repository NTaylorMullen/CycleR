using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class CycleMovementController : MovementController, IDisposable
    {
        private static double HALF_PI = Math.PI / 2;
        private MapConfiguration _mapConfiguration;        

        public CycleMovementController(Vector3 position, Vector3 velocity, double rotation, MapConfiguration mapConfiguration)
            : base(position, velocity, rotation)
        {
            _mapConfiguration = mapConfiguration;            
        }

        private void positionOnLine() 
        {        
            if (Velocity.z != 0) {
                Position.z -= (Position.z % _mapConfiguration.FLOOR_TILE_SIZE.Width) - _mapConfiguration.FLOOR_TILE_SIZE.Width * (Velocity.z / Math.Abs(Velocity.z));
            }
            else if (Velocity.x != 0) {
                Position.x -= (Position.x % _mapConfiguration.FLOOR_TILE_SIZE.Width) - _mapConfiguration.FLOOR_TILE_SIZE.Width * (Velocity.x / Math.Abs(Velocity.x));
            }
        }

        private void swapXZVelocity() 
        {
            // Swap x and z, aka perform movement switch
            var temp = Velocity.x;
            Velocity.x = Velocity.z;
            Velocity.z = temp; 
        }

        public void Move(CycleMovementFlag direction)
        {
            positionOnLine();

            if (direction == CycleMovementFlag.Left) {
                Rotation += HALF_PI;

                Velocity.x *= -1;
            }
            else if (direction == CycleMovementFlag.Right) {
                Rotation -= HALF_PI;

                Velocity.z *= -1;
            }

            this.swapXZVelocity();
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
