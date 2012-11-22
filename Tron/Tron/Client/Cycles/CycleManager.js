var SceneObjectCreator = (function () {
    function SceneObjectCreator() {
        this._pendingObjects = [];
    }
    SceneObjectCreator.prototype.AddToScene = function (object) {
        this._pendingObjects.push(object);
    };
    SceneObjectCreator.prototype.AddAllToScene = function (objects) {
        this._pendingObjects = this._pendingObjects.concat(objects);
    };
    SceneObjectCreator.prototype.GetPendingObjects = function () {
        if(this._pendingObjects.length !== 0) {
            var objects = this._pendingObjects;
            this._pendingObjects = [];
            return objects;
        } else {
            return [];
        }
    };
    return SceneObjectCreator;
})();
var Size = (function () {
    function Size(width, height) {
        this.Width = width;
        if(height) {
            this.Height = height;
        } else {
            this.Height = width;
        }
    }
    Size.prototype.Half = function () {
        return new Size(0.5 * this.Width, 0.5 * this.Height);
    };
    return Size;
})();
var Trail = (function () {
    function Trail(Direction, _startPosition, _color, OwnerID) {
        this.Direction = Direction;
        this._startPosition = _startPosition;
        this._color = _color;
        this.OwnerID = OwnerID;
        this._startPosition = this._startPosition.clone();
    }
    Trail.SIZE = new Size(20, 100);
    Trail.prototype.CreateContext = function () {
        this.Context = new THREE.Mesh(new THREE.CubeGeometry(1, Trail.SIZE.Height, 1), new THREE.MeshBasicMaterial({
            color: this._color
        }));
        if(this.Direction === "x") {
            this.Context.scale.z = Trail.SIZE.Width;
        } else {
            if(this.Direction === "z") {
                this.Context.scale.x = Trail.SIZE.Width;
            }
        }
        this.Context.position = this._startPosition.clone();
        this.Context.position.y = Trail.SIZE.Height / 2;
        return this.Context;
    };
    Trail.prototype.ExtendTo = function (ownerPosition) {
        var positionDiff = this._startPosition[this.Direction] - ownerPosition[this.Direction], newSize = Math.abs(positionDiff);
        this.Context.scale[this.Direction] = newSize;
        this.Context.position[this.Direction] = ownerPosition[this.Direction] + 0.5 * newSize * positionDiff / Math.abs(positionDiff);
    };
    return Trail;
})();
var TrailManager = (function () {
    function TrailManager(_trailColor, _owner) {
        this._trailColor = _trailColor;
        this._owner = _owner;
        this._trailArchive = [];
        this._pendingContexts = [];
        this.StartTrail(this._owner.MovementController.Velocity, this._owner.Context.position);
    }
    TrailManager.prototype.StartTrail = function (currentVelocity, startPosition) {
        if(this.CurrentTrail != null) {
            var startPositionOffset = startPosition.clone();
            this.CurrentTrail.ExtendTo(startPositionOffset);
            this.LastTrail = this.CurrentTrail;
        }
        var direction;
        if(currentVelocity.x !== 0) {
            direction = "x";
        } else {
            if(currentVelocity.z !== 0) {
                direction = "z";
            }
        }
        this.CurrentTrail = new Trail(direction, startPosition, this._trailColor, this._owner.ID);
        this._trailArchive.push(this.CurrentTrail);
        this._pendingContexts.push(this.CurrentTrail.CreateContext());
    };
    TrailManager.prototype.PullPendingContexts = function () {
        if(this._pendingContexts.length > 0) {
            var pendingContexts = this._pendingContexts;
            this._pendingContexts = [];
            return pendingContexts;
        } else {
            return [];
        }
    };
    TrailManager.prototype.Update = function (gameTime) {
        if(this.CurrentTrail) {
            this.CurrentTrail.ExtendTo(this._owner.Context.position);
        }
    };
    return TrailManager;
})();
var GameTime = (function () {
    function GameTime() {
        this.StartedAt = new Date();
        this.Now = this.LastUpdated = this.StartedAt;
        this.ElapsedGameTime = 0;
        this.FPS = 0;
        this.FractionOfSecond = 0;
    }
    GameTime.prototype.TotalGameTime = function () {
        return this.Now.getTime() - this.StartedAt.getTime();
    };
    GameTime.prototype.Update = function () {
        this.LastUpdated = this.Now;
        this.Now = new Date();
        this.ElapsedGameTime = this.Now.getTime() - this.LastUpdated.getTime();
        this.FPS = 1000 / this.ElapsedGameTime;
        this.FractionOfSecond = this.ElapsedGameTime / 1000;
    };
    return GameTime;
})();
var MovementController = (function () {
    function MovementController(_context, Speed) {
        this._context = _context;
        this.Speed = Speed;
        this.Velocity = new THREE.Vector3();
    }
    MovementController.prototype.Update = function (gameTime) {
    };
    return MovementController;
})();
var Collidable = (function () {
    function Collidable(id) {
        this.Disposed = false;
        this.ID = id;
    }
    return Collidable;
})();
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
var CycleMovementController = (function (_super) {
    __extends(CycleMovementController, _super);
    function CycleMovementController(_context) {
        _super.call(this, _context, CycleMovementController.MAX_SPEED);
        this._context = _context;
        this.Velocity.z = -CycleMovementController.MAX_SPEED;
    }
    CycleMovementController.MAX_SPEED = 700;
    CycleMovementController.prototype.positionOnLine = function () {
        if(this.Velocity.z !== 0) {
            this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.z / Math.abs(this.Velocity.z));
        } else {
            if(this.Velocity.x !== 0) {
                this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.x / Math.abs(this.Velocity.x));
            }
        }
    };
    CycleMovementController.prototype.swapXZVelocity = function () {
        var temp = this.Velocity.x;
        this.Velocity.x = this.Velocity.z;
        this.Velocity.z = temp;
    };
    CycleMovementController.prototype.Move = function (direction) {
        this.positionOnLine();
        if(direction === "Left") {
            this._context.rotation.y += (Math.PI / 2);
            this.Velocity.x *= -1;
        } else {
            if(direction === "Right") {
                this._context.rotation.y -= (Math.PI / 2);
                this.Velocity.z *= -1;
            }
        }
        this.swapXZVelocity();
    };
    CycleMovementController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        var incrementor = this.Velocity.clone().multiplyScalar(gameTime.FractionOfSecond);
        this._context.position.addSelf(incrementor);
    };
    return CycleMovementController;
})(MovementController);
var Cycle = (function (_super) {
    __extends(Cycle, _super);
    function Cycle(startPosition, id, rawModel, trailColor) {
        _super.call(this, id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;
        this.MovementController = new CycleMovementController(this.Context);
        this.TrailManager = new TrailManager(trailColor, this);
    }
    Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    Cycle.SCALE = new THREE.Vector3(37.22342991572615, 40, 35);
    Cycle.SIZE = new THREE.Vector2(200, 100);
    Cycle.prototype.createContext = function (rawModel) {
        var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        context.scale = Cycle.SCALE;
        return context;
    };
    Cycle.prototype.Move = function (direction) {
        this.MovementController.Move(direction);
        this.TrailManager.StartTrail(this.MovementController.Velocity, this.Context.position);
    };
    Cycle.prototype.Update = function (gameTime) {
        this.MovementController.Update(gameTime);
        this.TrailManager.Update(gameTime);
    };
    return Cycle;
})(Collidable);
var CycleManager = (function (_super) {
    __extends(CycleManager, _super);
    function CycleManager() {
        _super.call(this);
        this.Cycles = {
        };
    }
    CycleManager.prototype.Add = function (cycle) {
        this.Cycles[cycle.ID] = cycle;
        this.AddToScene(cycle.Context);
    };
    CycleManager.prototype.Update = function (gameTime) {
        for(var id in this.Cycles) {
            this.Cycles[id].Update(gameTime);
        }
    };
    return CycleManager;
})(SceneObjectCreator);
