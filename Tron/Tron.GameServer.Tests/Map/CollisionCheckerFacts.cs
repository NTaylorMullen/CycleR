using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;
using Xunit;

namespace Tron.GameServer
{
    public class CollisionCheckerFacts
    {
        [Fact]
        public void CycleIsCollidingInBounds()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);            
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var cycle2 = new Cycle(2, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var collisionChecker = new CollisionChecker(map);
            var startLocation = map.Utilities.ToMapLocation(startPosition);
            var cycles = new ConcurrentDictionary<long, Cycle>();
            cycles.TryAdd(cycle.ID, cycle);
            cycles.TryAdd(cycle2.ID, cycle2);
            map.RegisterCycles(cycles);

            map[startLocation] = 2;
            collisionChecker.ValidateCollision(cycle);

            Assert.True(cycle.Colliding);

            map.Clear();
            cycle.Colliding = false;
            map[startLocation] = -cycle.ID;
            collisionChecker.ValidateCollision(cycle);
            Assert.False(cycle.Colliding);

            map.Clear();
            cycle.Colliding = false;
            map[startLocation] = 0;
            collisionChecker.ValidateCollision(cycle);
            Assert.False(cycle.Colliding);
        }

        [Fact]
        public void CycleIsCollidingOutOfBounds()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .5 + gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var collisionChecker = new CollisionChecker(map);

            collisionChecker.ValidateCollision(cycle);
            Assert.True(cycle.Colliding);

            cycle.Colliding = false;
            cycle.MovementController.Position = new Vector3();
            collisionChecker.ValidateCollision(cycle);
            Assert.False(cycle.Colliding);
        }
    }
}
