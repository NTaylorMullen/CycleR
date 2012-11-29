using System;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class CycleMovementController : MovementController, IDisposable
    {
        private static double HALF_PI = Math.PI / 2;

        public CycleMovementController(Vector3 velocity, Vector3 position, double rotation) 
            : base(velocity, position, rotation)
        {
        }

        private void positionOnLine() 
        {        
            if (Velocity.Z != 0) {
                Position.Z -= (Position.Z % MapConfiguration.FLOOR_TILE_SIZE.Width) - MapConfiguration.FLOOR_TILE_SIZE.Width * (Velocity.Z / Math.Abs(Velocity.Z));
            }
            else if (Velocity.X != 0) {
                Position.X -= (Position.X % MapConfiguration.FLOOR_TILE_SIZE.Width) - MapConfiguration.FLOOR_TILE_SIZE.Width * (Velocity.X / Math.Abs(Velocity.X));
            }
        }

        private void swapXZVelocity() 
        {
            // Swap x and z, aka perform movement switch
            var temp = Velocity.X;
            Velocity.X = Velocity.Z;
            Velocity.Z = temp; 
        }

        public void Move(CycleMovementFlag direction)
        {
            positionOnLine();

            if (direction == CycleMovementFlag.Left) {
                Rotation += HALF_PI;

                Velocity.X *= -1;
            }
            else if (direction == CycleMovementFlag.Right) {
                Rotation -= HALF_PI;

                Velocity.Z *= -1;
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
