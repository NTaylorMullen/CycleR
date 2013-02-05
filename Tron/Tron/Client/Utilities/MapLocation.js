var MapLocation = (function () {
    function MapLocation(Row, Column) {
        this.Row = Row;
        this.Column = Column;
    }
    MapLocation.prototype.SameAs = function (mapLocation) {
        return this.Row === mapLocation.Row && this.Column === mapLocation.Column;
    };
    return MapLocation;
})();
//@ sourceMappingURL=MapLocation.js.map
