var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var CycleManager = (function (_super) {
    __extends(CycleManager, _super);
    function CycleManager() {
        _super.call(this);
    }
    CycleManager.prototype.Add = function (cycle) {
        this.AddToScene(cycle.Context);
    };
    return CycleManager;
})(SceneObjectCreator);
//@ sourceMappingURL=CycleManager.js.map
