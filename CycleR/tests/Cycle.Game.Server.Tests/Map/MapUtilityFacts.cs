using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;
using Xunit;
using Xunit.Extensions;

namespace CycleR.Game.Server.Tests
{
    public class MapUtilityFacts
    {
        private static GameConfiguration gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
        private static Map map = new Map(gameConfig.MapConfig);
        private static MapUtilities utilities = map.Utilities;

        [Theory]
        [InlineData(100, 100, 0, 0)]
        [InlineData(1, 1, -4950, -4950)]
        [InlineData(0, 1, -4950, -5000)]
        [InlineData(145, 175, 3750, 2250)]
        public void ToMapLocationTranslatesToPositionCorrectly(int row, int column, double x, double z)
        {
            var location = new MapLocation(row, column);
            var position = new Vector3(x, gameConfig.CycleConfig.Y_OFFSET, z);

            Assert.True(utilities.ToPosition(location, gameConfig.CycleConfig.Y_OFFSET).SameAs(position));
            Assert.True(utilities.ToMapLocation(position).SameAs(location));
        }

        [Theory]
        [InlineData(23, 42, true, 100, 100)]
        [InlineData(23, 42, false, 101, 101)]
        [InlineData(-2001, 2249, true, 144, 59)]
        [InlineData(-2001, 2249, false, 145, 60)]
        [InlineData(-4033, -3011, true, 39, 19)]
        [InlineData(-4033, -3011, false, 40, 20)]
        public void ToMapLocationWorksCorrectly(double x, double z, bool positiveVelocity, int expectedRow, int expectedColumn)
        {
            var expectedLocation = new MapLocation(expectedRow, expectedColumn);
            var position = new Vector3(x, gameConfig.CycleConfig.Y_OFFSET, z);
            var newMapLocation = utilities.ToMapLocation(position, positiveVelocity);
            Assert.True(newMapLocation.SameAs(expectedLocation));
        }
    }
}
