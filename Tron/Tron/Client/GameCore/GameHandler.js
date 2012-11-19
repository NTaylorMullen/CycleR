var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var GameHandler = (function (_super) {
    __extends(GameHandler, _super);
    function GameHandler(camera) {
        _super.call(this);
        this._camera = camera;
        this._cycleManager = new CycleManager();
    }
    GameHandler.prototype.ModelsLoaded = function (models) {
        this._models = models;
        var c = new Cycle(new THREE.Vector3(0, 35, 0), 0, this._models[ModelLibrary.Cycle.ModelName]);
        this._cycleManager.Add(c);
        this._cycleController = new CycleController(c);
        var controller = this._camera.GetController();
        controller.AttachTo(c.Context);
    };
    GameHandler.prototype.Update = function (gameTime) {
        this.AddAllToScene(this._cycleManager.GetPendingObjects());
        this._cycleManager.Update(gameTime);
    };
    return GameHandler;
})(SceneObjectCreator);
//@ sourceMappingURL=GameHandler.js.map
