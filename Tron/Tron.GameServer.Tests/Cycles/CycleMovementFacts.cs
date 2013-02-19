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
        [InlineData(1, 20, 0, 1, 0, 0, 1, 0, Math.PI)]
        [InlineData(1, 20, 0, 0, 100, 100, 0, 0, Math.PI)]
        [InlineData(1, -20, 0, -1, 0, 0, 1, 0, 0)]
        [InlineData(1, -20, 0, 0, 100, 100, 0, 0, 0)]
        [InlineData(20, 1, 1, 0, 0, 0, 0, 1, Math.PI * 1.5)]
        [InlineData(20, 1, 0, 0, 100, 100, 0, 0, Math.PI * 1.5)]
        [InlineData(20, 1, -1, 0, 0, 0, 50, 1, Math.PI * .5)]
        [InlineData(20, 1, 0, 0, 100, 100, 0, 0, Math.PI * .5)]
        public void GetLinePositionRepositionsCorrectly(double positionX, double positionZ, double velocityX, double velocityZ, int headRow, int headColumn, double expectedX, double expectedZ, double rotation)
        {
            var position = new Vector3(positionX, gameConfig.CycleConfig.Y_OFFSET, positionZ);
            var map = new Map(gameConfig.MapConfig);
            var velocity = new Vector3(velocityX, 0, velocityZ);
            var expectedPosition = new Vector3(expectedX, gameConfig.CycleConfig.Y_OFFSET, expectedZ);
            var movementController = new CycleMovementController(position, velocity, rotation, map, gameConfig);
            movementController.HeadLocation = new MapLocation(headRow, headColumn);

            Assert.True(movementController.GetLinePosition(movementController.Position).SameAs(expectedPosition));
        }

        [Theory]
        [InlineData(22,0, 0,0,10,10, Math.PI + Math.PI * .5,"Left")]
        [InlineData(22, 0, 0, 0, 10, 10, 0, "Left")]
        [InlineData(22, 0, 0, 0, 10, 10, Math.PI * .5, "Left")]
        [InlineData(22, 0, 0, 0, 10, 10, Math.PI, "Left")]
        [InlineData(22, 0, 0, 0, 10, 10, Math.PI + Math.PI * .5, "Right")]
        [InlineData(22, 0, 0, 0, 10, 10, 0, "Right")]
        [InlineData(22, 0, 0, 0, 10, 10, Math.PI * .5, "Right")]
        [InlineData(22, 0, 0, 0, 10, 10, Math.PI, "Right")]
        public void CycleMoveRepositionsOnHeadLocation(double positionX, double positionZ, double velocityX, double velocityZ, double headRow, double headColumn, double rotation, string direction)
        {
            var position = new Vector3(positionX, gameConfig.CycleConfig.Y_OFFSET, positionZ);
            var map = new Map(gameConfig.MapConfig);
            var velocity = new Vector3(velocityX, 0, velocityZ);
            var movementController = new CycleMovementController(position, velocity, rotation, map, gameConfig);
            movementController.HeadLocation = new MapLocation(headRow, headColumn);
            var movementFlag = (MovementFlag)Enum.Parse(typeof(MovementFlag), direction);
            var mapUtilities = new MapUtilities(gameConfig.MapConfig.MAP_SIZE, gameConfig.MapConfig.FLOOR_TILE_SIZE);

            movementController.Move(movementFlag);

            Assert.True(movementController.Position.SameAs(mapUtilities.ToPosition(new MapLocation(headRow, headColumn),gameConfig.CycleConfig.Y_OFFSET)));
        }
    }
}
