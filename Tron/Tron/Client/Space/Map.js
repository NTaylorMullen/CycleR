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
        Map.Utilities = new MapUtilities(Map.MAP_SIZE, Map.FLOOR_TILE_SIZE);
    }
    Map.FLOOR_TILE_SIZE = new Size(50);
    Map.MAP_SIZE = new Size(10000);
    Map.WALL_SIZE = new Size(Map.MAP_SIZE.Width, 2000);
    Map.prototype.cycleCollision = function (cycle) {
        var collisionLocation = Map.Utilities.ToMapLocationFromController(cycle.MovementController), rotation = Math.round(cycle.Context.rotation.y);
        if(rotation === 0) {
            collisionLocation.Row++;
        } else if(rotation === 2) {
            collisionLocation.Column++;
        } else if(rotation === 3) {
            collisionLocation.Row--;
        } else if(rotation === 5) {
            collisionLocation.Column++;
        }
        console.log("Collision occured! R: " + rotation + " Collision Location: ( " + collisionLocation.Row + ", " + collisionLocation.Column + " )");
        cycle.MovementController.HeadLocation = collisionLocation;
    };
    Map.prototype.RegisterCycles = function (cycles) {
        for(var i = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    };
    Map.prototype.Add = function (cycle) {
        var _this = this;
        cycle.MovementController.HeadLocation = Map.Utilities.ToMapLocationFromController(cycle.MovementController);
        this._cycles[cycle.ID] = cycle;
        $(cycle).on(Cycle.Events.OnCollision, function () {
            _this.cycleCollision(cycle);
        });
    };
    Map.prototype.Remove = function (cycleID) {
        delete this._cycles[cycleID];
    };
    Map.prototype.Update = function (gameTime) {
        for(var id in this._cycles) {
            var cycle = this._cycles[id], expectedHeadLocation = Map.Utilities.ToMapLocationFromController(cycle.MovementController);
            if(!cycle.Colliding) {
                cycle.MovementController.HeadLocation = expectedHeadLocation;
            }
            this.AddAllToScene(cycle.TrailManager.PullPendingContexts());
        }
    };
    return Map;
})(SceneObjectCreator);
//@ sourceMappingURL=Map.js.map
