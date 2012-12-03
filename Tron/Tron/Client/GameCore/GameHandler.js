var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameHandler = (function (_super) {
    __extends(GameHandler, _super);
    function GameHandler(gameHub, camera, _models) {
        _super.call(this);
        this._models = _models;
        this._camera = camera;
        this._cycleManager = new CycleManager();
        this._map = new Map();
        this._cycleController = new CycleController(gameHub);
    }
    GameHandler.prototype.Initialize = function (cycles) {
        this._cycleManager.AddAll(cycles);
    };
    GameHandler.prototype.ModelsLoaded = function (models) {
        this._models = models;
    };
    GameHandler.prototype.Update = function (gameTime) {
        this.AddAllToScene(this._cycleManager.GetPendingObjects());
        this.AddAllToScene(this._map.GetPendingObjects());
        this._cycleManager.Update(gameTime);
        this._map.Update(gameTime);
    };
    return GameHandler;
})(SceneObjectCreator);
//@ sourceMappingURL=GameHandler.js.map
