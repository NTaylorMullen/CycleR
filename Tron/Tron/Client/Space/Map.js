var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        _super.call(this);
        this._halfMapSize = new Size(Map.MAP_SIZE.Width * 0.5, Map.MAP_SIZE.Height * 0.5);
        this._dimensions = new Size(Map.MAP_SIZE.Width / Map.FLOOR_TILE_SIZE.Width, Map.MAP_SIZE.Height / Map.FLOOR_TILE_SIZE.Height);
        this._map = [];
        this._cycles = {
        };
        for(var i = 0; i < this._dimensions.Width; i++) {
            this._map[i] = [];
            for(var j = 0; j < this._dimensions.Height; j++) {
                this._map[i][j] = 0;
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
        this._cycles[cycle.ID] = cycle;
    };
    Map.prototype.Remove = function (cycleID) {
        delete this._cycles[cycleID];
    };
    Map.prototype.Update = function (gameTime) {
        for(var id in this._cycles) {
            var cycle = this._cycles[id];
            this.AddAllToScene(cycle.TrailManager.PullPendingContexts());
        }
    };
    return Map;
})(SceneObjectCreator);
//@ sourceMappingURL=Map.js.map
