var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
