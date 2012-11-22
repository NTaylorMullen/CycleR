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
var GameLoop = (function () {
    function GameLoop(_update, _draw, _proxy) {
        this._update = _update;
        this._draw = _draw;
        this._proxy = _proxy;
        this._gameTime = new GameTime();
    }
    GameLoop.prototype.loop = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.loop();
        });
        this._gameTime.Update();
        this._update.call(this._proxy, this._gameTime);
        this._draw.call(this._proxy);
        TWEEN.update();
    };
    GameLoop.prototype.Start = function () {
        this.loop();
    };
    return GameLoop;
})();
var ModelLibrary = (function () {
    function ModelLibrary() {
    }
    ModelLibrary.Cycle = {
        FilePath: "/Models/Cycles/cycle2.js",
        TexturePath: "/Models/Cycles",
        ModelName: "Cycle"
    };
    return ModelLibrary;
})();
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
var KeyboardAdapter = (function () {
    function KeyboardAdapter(_move, _proxy) {
        this._move = _move;
        this._proxy = _proxy;
        this._keyMappings = [];
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_LEFT,
            dir: "Left"
        });
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_RIGHT,
            dir: "Right"
        });
    }
    KeyboardAdapter.CONTROL_LEFT = [
        "a", 
        "Left"
    ];
    KeyboardAdapter.CONTROL_RIGHT = [
        "d", 
        "Right"
    ];
    KeyboardAdapter.prototype.Activate = function () {
        var that = this;
        for(var k = 0; k < this._keyMappings.length; k++) {
            for(var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        that._move.call(that._proxy, that._keyMappings[k].dir);
                    }
                })(k));
            }
        }
    };
    KeyboardAdapter.prototype.Deactivate = function () {
        for(var k = 0; k < this._keyMappings.length; k++) {
            for(var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.remove(this._keyMappings[k].key[z]);
            }
        }
    };
    return KeyboardAdapter;
})();
var CycleController = (function () {
    function CycleController(_gameHub) {
        this._gameHub = _gameHub;
    }
    CycleController.prototype.determineAdapter = function () {
        return new KeyboardAdapter(this._cycle.Move, this._cycle);
    };
    CycleController.prototype.move = function (direction) {
    };
    CycleController.prototype.AttachTo = function (cycle) {
        this._cycle = cycle;
        this._adapter = this.determineAdapter();
        this._adapter.Activate();
    };
    CycleController.prototype.Detach = function () {
        this._adapter.Deactivate();
        this._adapter = null;
    };
    return CycleController;
})();
var CameraController = (function () {
    function CameraController(_camera, renderer) {
        this._camera = _camera;
        this.applyKeyboardMappings();
    }
    CameraController.prototype.applyKeyboardMappings = function () {
    };
    CameraController.prototype.Update = function (gameTime) {
    };
    return CameraController;
})();
var FreeCameraController = (function (_super) {
    __extends(FreeCameraController, _super);
    function FreeCameraController(camera, renderer) {
        _super.call(this, camera, renderer);
        this.initializeCamera(camera);
    }
    FreeCameraController.MODE = "Free";
    FreeCameraController.MOVE_SPEED = 1000;
    FreeCameraController.LOOK_SPEED = 0.075;
    FreeCameraController.prototype.initializeCamera = function (camera) {
        this._controls = new THREE.FirstPersonControls(camera);
        this._controls.movementSpeed = FreeCameraController.MOVE_SPEED;
        this._controls.lookSpeed = FreeCameraController.LOOK_SPEED;
    };
    FreeCameraController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        this._controls.update(gameTime.FractionOfSecond);
    };
    return FreeCameraController;
})(CameraController);
var AttachedCameraController = (function (_super) {
    __extends(AttachedCameraController, _super);
    function AttachedCameraController(_camera, renderer) {
        var _this = this;
        _super.call(this, _camera, renderer);
        this._camera = _camera;
        this._theta = 0;
        this._cameraInverted = true;
        this._attachedTo = null;
        this._readMouse = false;
        this._mouseStart = new THREE.Vector2();
        this._thetaIncrementor = 0;
        document.addEventListener('mousemove', function (event) {
            _this.onMouseMove(event);
        }, false);
        document.addEventListener('mousedown', function (event) {
            _this.onMouseDown(event);
        }, false);
        document.addEventListener('mouseup', function (event) {
            _this.onMouseUp(event);
        }, false);
        this.applyKeyboardBindings();
    }
    AttachedCameraController.MODE = "Attached";
    AttachedCameraController.INTERPOLATE_THRESHOLD = 30;
    AttachedCameraController.CAMERA_SENSITIVITY = 300;
    AttachedCameraController.CAMERA_SPEED = 4;
    AttachedCameraController.CAMERA_HEIGHT = 300;
    AttachedCameraController.CAMERA_DISTANCE = 500;
    AttachedCameraController.TO_RADIANS = Math.PI / 360;
    AttachedCameraController.prototype.onMouseMove = function (event) {
        event.preventDefault();
        if(this._readMouse) {
            var thetaInverter = -1, thetaDirection = (this._mouseStart.x - event.clientX);
            if(thetaDirection !== 0) {
                thetaDirection /= Math.abs(thetaDirection);
            }
            if(!this._cameraInverted) {
                thetaInverter *= -1;
            }
            this._thetaIncrementor = (thetaDirection * thetaInverter * (Math.min(Math.abs((this._mouseStart.x - event.clientX) / AttachedCameraController.CAMERA_SENSITIVITY), 1))) * AttachedCameraController.CAMERA_SPEED;
        }
    };
    AttachedCameraController.prototype.onMouseDown = function (event) {
        event.preventDefault();
        this._mouseStart.x = event.clientX;
        this._mouseStart.y = event.clientY;
        this._readMouse = true;
    };
    AttachedCameraController.prototype.onMouseUp = function (event) {
        event.preventDefault();
        this._readMouse = false;
        this._thetaIncrementor = 0;
    };
    AttachedCameraController.prototype.tweenThetaOffsetBy = function (offset) {
        if(!this._readMouse) {
            this._theta = (this._attachedTo.rotation.y / AttachedCameraController.TO_RADIANS) + offset;
        }
    };
    AttachedCameraController.prototype.applyKeyboardBindings = function () {
        var _this = this;
        shortcut.add("1", function () {
            _this.tweenThetaOffsetBy(-90);
        });
        shortcut.add("2", function () {
            _this.tweenThetaOffsetBy(90);
        });
        shortcut.add("3", function () {
            _this.tweenThetaOffsetBy(-270);
        });
        shortcut.add("4", function () {
            _this.tweenThetaOffsetBy(270);
        });
    };
    AttachedCameraController.prototype.getAttachedPosition = function () {
        var position = this._lastAttachedPosition.clone(), xDiff = this._attachedTo.position.x - this._lastAttachedPosition.x, zDiff = this._attachedTo.position.z - this._lastAttachedPosition.z;
        if(Math.abs(xDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.x += (xDiff / Math.abs(xDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        } else {
            position.x = this._attachedTo.position.x;
        }
        if(Math.abs(zDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.z += (zDiff / Math.abs(zDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        } else {
            position.z = this._attachedTo.position.z;
        }
        return position;
    };
    AttachedCameraController.prototype.AttachTo = function (object) {
        if(this._attachedTo === null) {
            this._attachedTo = object;
            this._lastAttachedPosition = object.position.clone();
            this._camera.lookAt(object.position);
            this._camera.position.y = AttachedCameraController.CAMERA_HEIGHT;
        } else {
            throw new Error("Camera is already attached to an object.");
        }
    };
    AttachedCameraController.prototype.Detach = function () {
        if(this._attachedTo !== null) {
            this._attachedTo = null;
        } else {
            throw new Error("Camera is not attached to an objects.");
        }
    };
    AttachedCameraController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        if(this._attachedTo != null) {
            if(this._readMouse) {
                this._theta += this._thetaIncrementor;
            }
            var position = this.getAttachedPosition();
            this._camera.position.x = position.x + AttachedCameraController.CAMERA_DISTANCE * Math.sin(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.position.z = position.z + AttachedCameraController.CAMERA_DISTANCE * Math.cos(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.lookAt(this._attachedTo.position);
            this._lastAttachedPosition = position;
        }
    };
    return AttachedCameraController;
})(CameraController);
var Camera = (function () {
    function Camera(_renderer) {
        this._renderer = _renderer;
        this.initializeGameCamera();
        this.Mode = AttachedCameraController.MODE;
        this.initializeCameraControllers();
    }
    Camera.prototype.initializeGameCamera = function () {
        this.Context = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        THREEx.WindowResize(this._renderer, this.Context);
    };
    Camera.prototype.initializeCameraControllers = function () {
        this._controllers = {
            Free: new FreeCameraController(this.Context, this._renderer),
            Attached: new AttachedCameraController(this.Context, this._renderer)
        };
    };
    Camera.prototype.GetController = function () {
        return this._controllers[this.Mode];
    };
    Camera.prototype.Update = function (gameTime) {
        this._controllers[this.Mode].Update(gameTime);
    };
    return Camera;
})();
var GameHandler = (function (_super) {
    __extends(GameHandler, _super);
    function GameHandler(gameHub, camera) {
        _super.call(this);
        this._camera = camera;
        this._cycleManager = new CycleManager();
        this._map = new Map();
        this._cycleController = new CycleController(gameHub);
    }
    GameHandler.prototype.ModelsLoaded = function (models) {
        this._models = models;
        var c = new Cycle(new THREE.Vector3(0, 35, 0), 0, this._models[ModelLibrary.Cycle.ModelName], 16711680);
        this._cycleManager.Add(c);
        this._cycleController.AttachTo(c);
        var controller = this._camera.GetController();
        this._map.Add(c);
        if(controller.AttachTo) {
            controller.AttachTo(c.Context);
        }
    };
    GameHandler.prototype.Update = function (gameTime) {
        this.AddAllToScene(this._cycleManager.GetPendingObjects());
        this.AddAllToScene(this._map.GetPendingObjects());
        this._cycleManager.Update(gameTime);
        this._map.Update(gameTime);
    };
    return GameHandler;
})(SceneObjectCreator);
var EnvironmentRenderer = (function () {
    function EnvironmentRenderer(_scene) {
        this._scene = _scene;
        this.RenderFog();
        this.RenderLight();
    }
    EnvironmentRenderer.prototype.RenderFog = function () {
        this._scene.fog = new THREE.FogExp2(3355443, 0.0003);
        this._scene.fog.color.setHSV(0.1, 0.1, 1);
    };
    EnvironmentRenderer.prototype.RenderLight = function () {
        this._light = new THREE.DirectionalLight(16777215, 1.5);
        this._light.position.set(0, 1, 1).normalize();
        this._scene.add(this._light);
    };
    return EnvironmentRenderer;
})();
var MapRenderer = (function () {
    function MapRenderer(_scene) {
        this._scene = _scene;
        this.renderFloor();
        this.renderWalls();
    }
    MapRenderer.prototype.renderFloor = function () {
        var planeTesselated = new THREE.PlaneGeometry(Map.MAP_SIZE.Width, Map.MAP_SIZE.Height, Map.FLOOR_TILE_SIZE.Width, Map.FLOOR_TILE_SIZE.Height), matWire = new THREE.MeshBasicMaterial({
color: 2414099,
wireframe: true,
wireframeLinewidth: 2        });
        this._floor = new THREE.Mesh(planeTesselated, matWire);
        this._floor.position = new THREE.Vector3(0, 0, 0);
        this._floor.rotation.x = -Math.PI / 2;
        this._scene.add(this._floor);
    };
    MapRenderer.prototype.renderWalls = function () {
        var wallGeometry = new THREE.PlaneGeometry(Map.WALL_SIZE.Width, Map.WALL_SIZE.Height), wallMaterial = new THREE.MeshBasicMaterial({
color: 3355443        }), wallLength = Map.MAP_SIZE.Width / 2, halfWallHeight = Map.WALL_SIZE.Height / 2, wallPositions = [
[
0, 
halfWallHeight, 
wallLength, 
Math.PI            ], 
[
0, 
halfWallHeight, 
-wallLength, 
0            ], 
[
wallLength, 
halfWallHeight, 
0, 
Math.PI * 1.5            ], 
[
-wallLength, 
halfWallHeight, 
0, 
Math.PI / 2            ]        ];
        this._walls = [];
        for(var i = 0; i < 4; i++) {
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position = new THREE.Vector3(wallPositions[i][0], wallPositions[i][1], wallPositions[i][2]);
            wall.rotation.y = wallPositions[i][3];
            this._walls.push(wall);
            this._scene.add(wall);
        }
    };
    return MapRenderer;
})();
var CoreRenderer = (function () {
    function CoreRenderer(_scene) {
        this._scene = _scene;
    }
    CoreRenderer.prototype.determineRenderer = function () {
        if(THREE.Detector.webgl) {
            return new THREE.WebGLRenderer({
                preserveDrawingBuffer: true
            });
        } else {
            if(THREE.Detector.canvas) {
                return new THREE.CanvasRenderer();
            } else {
                alert("Your browser does not support 3D techniques.  Please try again in a newer browser.");
            }
        }
    };
    CoreRenderer.prototype.Initialize = function () {
        this._renderer = this.determineRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        $("#GameWrapper").append(this._renderer.domElement);
        return this._renderer;
    };
    CoreRenderer.prototype.Draw = function (camera) {
        this._renderer.render(this._scene, camera.Context);
    };
    return CoreRenderer;
})();
var GameRenderer = (function () {
    function GameRenderer() {
        this._scene = new THREE.Scene();
        this._environmentRenderer = new EnvironmentRenderer(this._scene);
        this._mapRenderer = new MapRenderer(this._scene);
        this._coreRenderer = new CoreRenderer(this._scene);
        this.Renderer = this._coreRenderer.Initialize();
    }
    GameRenderer.prototype.Add = function (object) {
        this._scene.add(object);
    };
    GameRenderer.prototype.AddAll = function (objects) {
        for(var i = 0; i < objects.length; i++) {
            this._scene.add(objects[i]);
        }
    };
    GameRenderer.prototype.Draw = function (camera) {
        this._coreRenderer.Draw(camera);
    };
    return GameRenderer;
})();
var ModelLoader = (function () {
    function ModelLoader() {
        this._jsonLoader = new THREE.JSONLoader();
        this._models = {
        };
    }
    ModelLoader.prototype.LoadModel = function (loadRequest, done) {
        var _this = this;
        this._jsonLoader.load(loadRequest.FilePath, function (geometry) {
            _this._models[loadRequest.ModelName] = geometry;
            if(done) {
                done();
            }
        }, loadRequest.TexturePath);
    };
    ModelLoader.prototype.LoadModels = function (filesToLoad) {
        for(var i = 0; i < filesToLoad.length; i++) {
            this.LoadModel(filesToLoad[i]);
        }
    };
    ModelLoader.prototype.GetModel = function (name) {
        if(this._models[name]) {
            return this._models[name];
        } else {
            throw new Error("Model '" + name + "' has not been loaded.");
        }
    };
    ModelLoader.prototype.GetModels = function () {
        return this._models;
    };
    return ModelLoader;
})();
var Game = (function () {
    function Game(gameHub) {
        this._modelLoader = new ModelLoader();
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameHandler = new GameHandler(gameHub, this._camera);
        this.load();
        this._gameLoop.Start();
    }
    Game.prototype.load = function () {
        var _this = this;
        this._modelLoader.LoadModel(ModelLibrary.Cycle, function () {
            _this._gameHandler.ModelsLoaded(_this._modelLoader.GetModels());
        });
    };
    Game.prototype.Draw = function () {
        this._gameRenderer.Draw(this._camera);
        this._gameRenderer.AddAll(this._gameHandler.GetPendingObjects());
    };
    Game.prototype.Update = function (gameTime) {
        this._gameHandler.Update(gameTime);
        this._camera.Update(gameTime);
    };
    return Game;
})();
