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
        this._map.RegisterCycles(cycles);
        this._cycleController.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID]);
        var controller = this._camera.GetController();
        if(controller.AttachTo) {
            controller.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID].Context);
        }
    };
    GameHandler.prototype.ServerCollisionPayload = function (payload) {
        var cycle = this._cycleManager.Cycles[payload.ID];
        cycle.HandleCollision(payload);
    };
    GameHandler.prototype.ServerMovementPayload = function (payload) {
        this._cycleManager.ServerMovementPayload(payload);
    };
    GameHandler.prototype.ServerDeathPayload = function (payload) {
        var cycle = this._cycleManager.Remove(payload.ID);
        this._map.Remove(payload.ID);
        if(payload.ID === ConnectionManager.UserID) {
            this._cycleController.Detach();
            (this._camera.GetController()).Detach();
            this._camera.Mode = FreeCameraController.MODE;
        }
        cycle.Die(payload.DiedAt);
        return cycle;
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
