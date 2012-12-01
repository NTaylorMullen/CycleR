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
//@ sourceMappingURL=CycleController.js.map
