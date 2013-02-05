var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CycleManager = (function (_super) {
    __extends(CycleManager, _super);
    function CycleManager() {
        _super.call(this);
        this.Cycles = {
        };
    }
    CycleManager.prototype.AddAll = function (cycles) {
        for(var i = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    };
    CycleManager.prototype.Add = function (cycle) {
        this.Cycles[cycle.ID] = cycle;
        this.AddToScene(cycle.Context);
    };
    CycleManager.prototype.Remove = function (cycleID) {
        var cycle = this.Cycles[cycleID];
        delete this.Cycles[cycleID];
        return cycle;
    };
    CycleManager.prototype.ServerMovementPayload = function (payload) {
        var cycle = this.Cycles[payload.ID];
        cycle.Context.position = payload.Position;
        cycle.Move(payload.Direction);
    };
    CycleManager.prototype.Update = function (gameTime) {
        for(var id in this.Cycles) {
            this.Cycles[id].Update(gameTime);
        }
    };
    return CycleManager;
})(SceneObjectCreator);
//@ sourceMappingURL=CycleManager.js.map
