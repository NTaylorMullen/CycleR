/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="MapLocation.ts" />

class MapUtilities {
    private _halfMapSize: Size;
    private _dimensions: Size;

    constructor(private _mapSize: Size, private _floorTileSize: Size) {
        this._halfMapSize = _mapSize.Half();
        this._dimensions = new Size(this._mapSize.Width / this._floorTileSize.Width, this._mapSize.Height / this._floorTileSize.Height);
    }

    public ToMapLocation(position: IVector3): MapLocation {
        return new MapLocation(~~((position.z + this._halfMapSize.Height) / this._floorTileSize.Height), ~~((position.x + this._halfMapSize.Width) / this._floorTileSize.Width));
    }

    public ToPosition(location: MapLocation, y: number): IVector3 {
        return new THREE.Vector3(location.Column * this._floorTileSize.Width - this._halfMapSize.Width, y, location.Row * this._floorTileSize.Height - this._halfMapSize.Height);
    }

    public PositionOutOfBounds(position: IVector3): bool {
        return this.XOutOfBounds(position.x) || this.ZOutOfBounds(position.z);
    }

    public LocationOutOfBounds(location: MapLocation): bool {
        return this.RowOutOfBounds(location.Row) || this.ColumnOutOfBounds(location.Column);
    }

    public RowOutOfBounds(row: number): bool {
        return row < 0 || row >= this._dimensions.Height;
    }

    public ColumnOutOfBounds(column: number): bool {
        return column < 0 || column >= this._dimensions.Width;
    }

    public XOutOfBounds(x: number): bool {
        return x < -this._halfMapSize.Width || x > this._halfMapSize.Width;
    }

    public ZOutOfBounds(z: number): bool {
        return z < -this._halfMapSize.Height || z > this._halfMapSize.Height;
    }
}
