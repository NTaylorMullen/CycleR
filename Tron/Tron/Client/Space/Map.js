var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        _super.call(this);
        this._mapArea = [];
        this._contents = {
        };
        var actualTileSize = Map.MAP_SIZE.Width / Map.FLOOR_TILE_SIZE.Width;
        for(var i = 0; i < Map.MAP_SIZE.Width; i += actualTileSize) {
            this._mapArea[i] = [];
            for(var j = 0; j < Map.MAP_SIZE.Height; j += actualTileSize) {
                this._mapArea[i][j] = -1;
            }
        }
    }
    Map.FLOOR_TILE_SIZE = new Size(100);
    Map.MAP_SIZE = new Size(10000);
    Map.WALL_SIZE = new Size(Map.MAP_SIZE.Width, 2000);
    Map.prototype.AddAll = function (cycles) {
        for(var i = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    };
    Map.prototype.Add = function (cycle) {
        this._contents[cycle.ID] = cycle;
    };
    Map.prototype.Remove = function (cycle) {
        delete this._contents[cycle.ID];
    };
    Map.prototype.Update = function (gameTime) {
        for(var id in this._contents) {
            this.AddAllToScene(this._contents[id].TrailManager.PullPendingContexts());
        }
    };
    return Map;
})(SceneObjectCreator);
//@ sourceMappingURL=Map.js.map
