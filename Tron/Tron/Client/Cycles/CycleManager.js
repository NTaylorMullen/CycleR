var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
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
