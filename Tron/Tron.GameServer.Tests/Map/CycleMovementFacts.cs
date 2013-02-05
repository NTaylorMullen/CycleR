using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;
using Xunit;
using Xunit.Extensions;

namespace Tron.GameServer.Tests
{
    public class CycleMovementFacts
    {
        private static GameConfiguration gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());

        [Theory]
        [InlineData(1, 20, 0, 1, 1, 0, Math.PI)]
        [InlineData(1, 20, 0, 0, 1, -50, Math.PI)]
        [InlineData(1, -20, 0, -1, 1, 0, 0)]
        [InlineData(1, -20, 0, 0, 1, 50, 0)]
        [InlineData(20, 1, 1, 0, 0, 1, Math.PI * 1.5)]
        [InlineData(20, 1, 0, 0, -50, 1, Math.PI * 1.5)]
        [InlineData(20, 1, -1, 0, 50, 1, Math.PI * .5)]
        [InlineData(20, 1, 0, 0, 100, 1, Math.PI * .5)]
        public void GetLinePositionRepositionsCorrectly(double positionX, double positionZ, double velocityX, double velocityZ, double expectedX, double expectedZ, double rotation)
        {
            var position = new Vector3(positionX, gameConfig.CycleConfig.Y_OFFSET, positionZ);
            var map = new Map(gameConfig.MapConfig);
            var velocity = new Vector3(velocityX, 0, velocityZ);
            var expectedPosition = new Vector3(expectedX, gameConfig.CycleConfig.Y_OFFSET, expectedZ);
            var movementController = new CycleMovementController(position, velocity, rotation, map, gameConfig);

            Assert.True(movementController.GetLinePosition(movementController.Position).SameAs(expectedPosition));
        }

        [Theory]
        [InlineData()]
        public void CycleMoveRepositionsOnHeadLocation(double positionX, double positionZ, double velocityX, double velocityZ, double rotation, string direction, double expectedX, double expectedZ)
        {
            var position = new Vector3(positionX, gameConfig.CycleConfig.Y_OFFSET, positionZ);
            var map = new Map(gameConfig.MapConfig);
            var velocity = new Vector3(velocityX, 0, velocityZ);
            var expectedPosition = new Vector3(expectedX, gameConfig.CycleConfig.Y_OFFSET, expectedZ);
            var movementController = new CycleMovementController(position, velocity, rotation, map, gameConfig);
            var movementFlag = (MovementFlag)Enum.Parse(typeof(MovementFlag), direction);
            var mapUtilities = new MapUtilities(gameConfig.MapConfig.MAP_SIZE, gameConfig.MapConfig.FLOOR_TILE_SIZE);

            movementController.Move(movementFlag);

            Assert.True(movementController.Position.SameAs(expectedPosition));
        }
    }
}
