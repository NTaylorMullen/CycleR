var MapUtilities = (function () {
    function MapUtilities(_mapSize, _floorTileSize) {
        this._mapSize = _mapSize;
        this._floorTileSize = _floorTileSize;
        this._halfMapSize = _mapSize.Half();
        this._dimensions = new Size(this._mapSize.Width / this._floorTileSize.Width, this._mapSize.Height / this._floorTileSize.Height);
    }
    MapUtilities.prototype.ToMapLocation = function (position) {
        return new MapLocation(~~((position.z + this._halfMapSize.Height) / this._floorTileSize.Height), ~~((position.x + this._halfMapSize.Width) / this._floorTileSize.Width));
    };
    MapUtilities.prototype.ToPosition = function (location, y) {
        return new THREE.Vector3(location.Column * this._floorTileSize.Width - this._halfMapSize.Width, y, location.Row * this._floorTileSize.Height - this._halfMapSize.Height);
    };
    MapUtilities.prototype.PositionOutOfBounds = function (position) {
        return this.XOutOfBounds(position.x) || this.ZOutOfBounds(position.z);
    };
    MapUtilities.prototype.LocationOutOfBounds = function (location) {
        return this.RowOutOfBounds(location.Row) || this.ColumnOutOfBounds(location.Column);
    };
    MapUtilities.prototype.RowOutOfBounds = function (row) {
        return row < 0 || row >= this._dimensions.Height;
    };
    MapUtilities.prototype.ColumnOutOfBounds = function (column) {
        return column < 0 || column >= this._dimensions.Width;
    };
    MapUtilities.prototype.XOutOfBounds = function (x) {
        return x < -this._halfMapSize.Width || x > this._halfMapSize.Width;
    };
    MapUtilities.prototype.ZOutOfBounds = function (z) {
        return z < -this._halfMapSize.Height || z > this._halfMapSize.Height;
    };
    return MapUtilities;
})();
//@ sourceMappingURL=MapUtilities.js.map
