using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class MapUtilities : IDisposable
    {        
        private Size _mapSize;
        private Size _halfMapSize;
        private Size _floorTileSize;
        private Size _dimensions;

        public MapUtilities(Size mapSize, Size floorTileSize)
        {
            _mapSize = mapSize;
            _halfMapSize = _mapSize * .5;
            _floorTileSize = floorTileSize;
            _dimensions = new Size(_mapSize.Width / _floorTileSize.Width, _mapSize.Height / _floorTileSize.Height);
        }

        public MapLocation ToMapLocation(CycleMovementController cycleController)
        {
            return ToMapLocation(cycleController.Position, cycleController.Velocity);
        }

        public MapLocation ToMapLocation(Vector3 position, Vector3 velocity)
        {
            var value = velocity.SingleValue();
            var positiveVelocity = true;

            if(value < 0)
            {
                positiveVelocity = false;
            }
            // if value is 0 we just assume positvie velocity because there is no movement going on

            return ToMapLocation(position, positiveVelocity);
        }

        public MapLocation ToMapLocation(Vector3 position, bool positiveVelocity = true)
        {
            if (positiveVelocity)
            {
                return new MapLocation(Math.Floor((position.z + _halfMapSize.Height) / _floorTileSize.Height), Math.Floor((position.x + _halfMapSize.Width) / _floorTileSize.Width));
            }
            else
            {
                return new MapLocation(Math.Ceiling((position.z + _halfMapSize.Height) / _floorTileSize.Height), Math.Ceiling((position.x + _halfMapSize.Width) / _floorTileSize.Width));
            }
        }

        public Vector3 ToPosition(MapLocation position, double y)
        {
            return new Vector3(position.Column * _floorTileSize.Width - _halfMapSize.Width, y, position.Row * _floorTileSize.Height - _halfMapSize.Height);
        }

        public bool OutOfBounds(MapLocation location)
        {
            return RowOutOfBounds(location.Row) || ColumnOutOfBounds(location.Column);
        }

        public bool OutOfBounds(Vector3 position)
        {
            return XOutOfBounds(position.x) || ZOutOfBounds(position.z);
        }

        public bool RowOutOfBounds(int row)
        {
            return row <= 0 || row >= _dimensions.Height;
        }

        public bool XOutOfBounds(double x)
        {
            return x < -_halfMapSize.Width || x > _halfMapSize.Width;
        }

        public bool ZOutOfBounds(double z)
        {
            return z < -_halfMapSize.Height || z > _halfMapSize.Height;
        }

        public bool ColumnOutOfBounds(int column)
        {
            return column <= 0 || column >= _dimensions.Width;
        }

        public MapLocation GetCycleMapLocation(Cycle cycle)
        {
            // Normalize to the quadrant in which the cycle lies
            MapLocation quadrant = ToMapLocation(cycle.MovementController.GetLinePosition(cycle.MovementController.Position));

            return quadrant;
        }

        public void Dispose()
        {
            _mapSize = null;
            _halfMapSize = null;
            _floorTileSize = null;
            _dimensions = null;
        }
    }
}
