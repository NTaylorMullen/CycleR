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
    Map.prototype.getCycleMapLocation = function (cycle) {
        var mapLocation = cycle.Context.position.clone();
        if(cycle.MovementController.Velocity.z != 0) {
            mapLocation.z -= (mapLocation.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.z / Math.abs(cycle.MovementController.Velocity.z));
        } else if(cycle.MovementController.Velocity.x != 0) {
            mapLocation.x -= (mapLocation.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.x / Math.abs(cycle.MovementController.Velocity.x));
        }
        var quadrant = new MapLocation(Math.abs((mapLocation.z + this._halfMapSize.Height) / Map.FLOOR_TILE_SIZE.Height), Math.abs((mapLocation.x + this._halfMapSize.Width) / Map.FLOOR_TILE_SIZE.Width));
        return quadrant;
    };
    Map.prototype.updateMap = function () {
        for(var id in this._cycles) {
            var cycle = this._cycles[id];
            if(cycle.Alive) {
                var quadrant = this.getCycleMapLocation(cycle);
                if(quadrant.Row < 0 || quadrant.Row >= this._dimensions.Height || quadrant.Column < 0 || quadrant.Column >= this._dimensions.Width) {
                    cycle.HandleCollisionWith(null);
                } else {
                    var currentLocation = this._map[quadrant.Row][quadrant.Column];
                    if(currentLocation == 0) {
                        this._map[cycle.MovementController.HeadLocation.Row][cycle.MovementController.HeadLocation.Column] = cycle.ID;
                        cycle.MovementController.HeadLocation = quadrant;
                        this._map[quadrant.Row][quadrant.Column] = -cycle.ID;
                    } else {
                        if(currentLocation != -cycle.ID) {
                            if(currentLocation < 0) {
                                this._cycles[Math.abs(currentLocation)].HandleCollisionWith(cycle);
                            }
                            cycle.HandleCollisionWith(this._cycles[Math.abs(currentLocation)]);
                        }
                    }
                }
            }
        }
    };
    Map.prototype.AddAll = function (cycles) {
        for(var i = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    };
    Map.prototype.Add = function (cycle) {
        cycle.MovementController.HeadLocation = this.getCycleMapLocation(cycle);
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
