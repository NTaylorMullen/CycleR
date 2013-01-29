using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;
using Xunit;

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
            var mapUtilities = new MapUtilities(gameConfig.MapConfig.MAP_SIZE, gameConfig.MapConfig.FLOOR_TILE_SIZE);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map, mapUtilities);

            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .5 + gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(new Vector3(4950, gameConfig.CycleConfig.Y_OFFSET, 0)));
            Assert.True(mapUtilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 199)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(-gameConfig.MapConfig.MAP_SIZE.Width * .5 - gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.MovementController.Velocity = new Vector3(-1, 0, 0);
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(new Vector3(-5000, gameConfig.CycleConfig.Y_OFFSET, 0)));
            Assert.True(mapUtilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 0)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(-gameConfig.MapConfig.MAP_SIZE.Width * .5, gameConfig.CycleConfig.Y_OFFSET, 0);
            var expected = cycle.MovementController.RequestedPosition.Clone();
            cycle.MovementController.Velocity = new Vector3(-1, 0, 0);
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(expected));
            Assert.True(mapUtilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 0)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .25, gameConfig.CycleConfig.Y_OFFSET, 0);
            expected = cycle.MovementController.RequestedPosition.Clone();
            cycle.MovementController.Velocity = new Vector3(1, 0, 0);
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            cycle.MovementController.Rotation = Math.PI + Math.PI * .5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(expected));
            Assert.True(mapUtilities.ToMapLocation(cycle.MovementController.Position).SameAs(new MapLocation(100, 150)));

            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = startPosition;
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(startPosition));
            Assert.True(mapUtilities.ToMapLocation(cycle.MovementController.Position).SameAs(mapUtilities.ToMapLocation(startPosition)));
        }

        [Fact]
        public void CyclePositionedCorrectlyWithCollisions()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);
            var mapUtilities = new MapUtilities(gameConfig.MapConfig.MAP_SIZE, gameConfig.MapConfig.FLOOR_TILE_SIZE);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map, mapUtilities);
            var newPosition = startPosition.Clone();
            var collision = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 5;
            collision.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 3;

            cycle.MovementController.RequestedPosition = newPosition;
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            map[mapUtilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[mapUtilities.ToMapLocation(collision)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(collision));

            map.Clear();
            newPosition = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = newPosition;
            map[mapUtilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[mapUtilities.ToMapLocation(newPosition)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(newPosition));

            map.Clear();
            newPosition = startPosition.Clone();
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            cycle.MovementController.Position = startPosition;
            cycle.MovementController.RequestedPosition = newPosition;
            map[mapUtilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[mapUtilities.ToMapLocation(newPosition)] = 5;
            newPosition.x += gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            map[mapUtilities.ToMapLocation(newPosition)] = 5;
            newPosition.x -= gameConfig.MapConfig.FLOOR_TILE_SIZE.Width;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(newPosition));
        }

        [Fact]
        public void CyclePositionedCorrectlyInBoundsAndColliding()
        {
            var gameConfig = new GameConfiguration(new CycleConfiguration(), new MapConfiguration());
            var map = new Map(gameConfig.MapConfig);
            var startPosition = new Vector3(0, gameConfig.CycleConfig.Y_OFFSET, 0);
            var mapUtilities = new MapUtilities(gameConfig.MapConfig.MAP_SIZE, gameConfig.MapConfig.FLOOR_TILE_SIZE);
            var cycle = new Cycle(1, startPosition, new Vector3(1, 0, 0), Math.PI + Math.PI * .5, 0xff0000, map, gameConfig);
            var requestValidator = new RequestValidator(map, mapUtilities);
            var collision = startPosition.Clone();
            collision.x = gameConfig.MapConfig.MAP_SIZE.Width * .5 - gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 3;

            cycle.MovementController.RequestedPosition = new Vector3(gameConfig.MapConfig.MAP_SIZE.Width * .5 + gameConfig.MapConfig.FLOOR_TILE_SIZE.Width * 10, gameConfig.CycleConfig.Y_OFFSET, 0);
            cycle.HeadLocation = mapUtilities.ToMapLocation(cycle.MovementController.Position);
            map[mapUtilities.ToMapLocation(startPosition)] = -cycle.ID;
            map[mapUtilities.ToMapLocation(collision)] = 5;
            requestValidator.ValidateRequestedPosition(cycle);

            Assert.True(cycle.MovementController.Position.SameAs(collision));
        }
    }
}
