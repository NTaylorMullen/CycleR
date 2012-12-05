var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameHandler = (function (_super) {
    __extends(GameHandler, _super);
    function GameHandler(gameServer, camera) {
        _super.call(this);
        this._camera = camera;
        this._cycleManager = new CycleManager();
        this._map = new Map();
        this._cycleController = new CycleController(gameServer);
    }
    GameHandler.prototype.Initialize = function (cycles) {
        this._cycleManager.AddAll(cycles);
        this._map.AddAll(cycles);
        this._cycleController.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID]);
        var controller = this._camera.GetController();
        if(controller.AttachTo) {
            controller.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID].Context);
        }
    };
    GameHandler.prototype.ServerMovementPayload = function (payload) {
        this._cycleManager.ServerMovementPayload(payload);
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
