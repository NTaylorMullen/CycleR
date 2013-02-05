using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;
using Xunit;

namespace Tron.GameServer.Tests
{
    public class MapMarkerFacts
    {
        private static GameConfiguration gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());

        [Fact]
        public void MarksMapSpaceFillsMapCorrectlyInclusive()
        {
            var headLocation = new MapLocation(50, 50);
            var newLocation = new MapLocation(50, 54);
            var fillValue = 1;
            var inclusive = true;
            var map = new Map(gameConfig.MapConfig);
            var mapMarker = new MapMarker(map);
            var incrementor = new MapLocation(0, 1);

            map[headLocation] = -1;

            mapMarker.MarkArea(headLocation, newLocation, fillValue, inclusive);
            Assert.Equal(map[newLocation], 0);
            Assert.Equal(map[headLocation], -1);

            for (MapLocation i = headLocation + incrementor; !i.SameAs(newLocation); i += incrementor)
            {
                Assert.Equal(map[i], fillValue);
            }
        }

        [Fact]
        public void MarksMapSpaceFillsMapCorrectlyNonInclusive()
        {
            var headLocation = new MapLocation(50, 50);
            var newLocation = new MapLocation(50, 54);
            var fillValue = 1;
            var inclusive = false;
            var map = new Map(gameConfig.MapConfig);
            var mapMarker = new MapMarker(map);
            var incrementor = new MapLocation(0, 1);

            map[headLocation] = -1;

            mapMarker.MarkArea(headLocation, newLocation, fillValue, inclusive);
            Assert.Equal(map[newLocation], 0);
            Assert.Equal(map[newLocation - incrementor], 0);
            Assert.Equal(map[headLocation], -1);

            for (MapLocation i = headLocation + incrementor; !i.SameAs(newLocation - incrementor); i += incrementor)
            {
                Assert.Equal(map[i], fillValue);
            }
        }
    }
}
