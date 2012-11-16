var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var GameHandler = (function (_super) {
    __extends(GameHandler, _super);
    function GameHandler() {
        _super.call(this);
        this._cycleManager = new CycleManager();
    }
    GameHandler.prototype.ModelsLoaded = function (models) {
        this._models = models;
        var c = new Cycle(new THREE.Vector3(0, 35, 0), this._models[ModelLibrary.Cycle.ModelName]);
        this._cycleManager.Add(c);
    };
    GameHandler.prototype.Update = function (gameTime) {
        this.AddAllToScene(this._cycleManager.GetPendingObjects());
    };
    return GameHandler;
})(SceneObjectCreator);
//@ sourceMappingURL=GameHandler.js.map
