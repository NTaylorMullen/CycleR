using Moq;
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
    public class RequestValidatorFacts
    {
        [Fact]
        public void CyclePositionedCorrectlyInBounds()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map);

            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .5 + gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(new Vector3(4950, gameConfig.CycleConfig.Y_OFFSET, 0)));
            Assert.True(map.Utilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 199)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(-gameConfig.MapConfig.MAP_SIZE.Width * .5 - gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.MovementController.Velocity = new Vector3(-1, 0, 0);
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(new Vector3(-5000, gameConfig.CycleConfig.Y_OFFSET, 0)));
            Assert.True(map.Utilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 0)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(-gameConfig.MapConfig.MAP_SIZE.Width * .5, gameConfig.CycleConfig.Y_OFFSET, 0);
            var expected = cycle.MovementController.RequestedPosition.Clone();
            cycle.MovementController.Velocity = new Vector3(-1, 0, 0);
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(expected));
            Assert.True(map.Utilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 0)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .25, gameConfig.CycleConfig.Y_OFFSET, 0);
            expected = cycle.MovementController.RequestedPosition.Clone();
            cycle.MovementController.Velocity = new Vector3(1, 0, 0);
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI + Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(expected));
            Assert.True(map.Utilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 150)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = startPosition;
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(startPosition));
            Assert.True(map.Utilities.ToMapLocation(cycle.MovementController.Position).SameAs(map.Utilities.ToMapLocation(startPosition)));
        }

        [Fact]
        public void CyclePositionedCorrectlyWithCollisions()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map);
            var newPosition = startPosition.Clone();
            var collision = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 5;
            collision.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 3;

            cycle.MovementController.RequestedPosition = newPosition;
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            map[map.Utilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[map.Utilities.ToMapLocation(collision)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(collision));

            map.Clear();
            newPosition = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = newPosition;
            map[map.Utilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[map.Utilities.ToMapLocation(newPosition)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(newPosition));

            map.Clear();
            newPosition = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = newPosition;
            map[map.Utilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[map.Utilities.ToMapLocation(newPosition)] = 5;
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            map[map.Utilities.ToMapLocation(newPosition)] = 5;
            newPosition.x -= gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(newPosition));

            map.Clear();
            newPosition = map.Utilities.ToPosition(new MapLocation(23, 173),gameConfig.CycleConfig.Y_OFFSET);
            cycle.MovementController.Position = map.Utilities.ToPosition(new MapLocation(25, 173), gameConfig.CycleConfig.Y_OFFSET);
            cycle.MovementController.RequestedPosition = newPosition;
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Velocity = new Vector3(0, 0, -1);
            cycle.MovementController.Rotation = 0;
            map[map.Utilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[new MapLocation(24,173)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(map.Utilities.ToPosition(new MapLocation(24, 173), gameConfig.CycleConfig.Y_OFFSET)));
        }

        [Fact]
        public void CyclePositionedCorrectlyInBoundsAndColliding()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map);
            var collision = startPosition.Clone();
            collision.x = gameConfig.MapConfig.MAP_SIZE.Width * .5 - gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 3;

            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .5 + gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.MovementController.HeadLocation = map.Utilities.ToMapLocation(cycle.MovementController.Position);
            map[map.Utilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[map.Utilities.ToMapLocation(collision)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(collision));
        }
    }
}
