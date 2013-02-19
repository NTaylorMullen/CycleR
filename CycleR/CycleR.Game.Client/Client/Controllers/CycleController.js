var CycleController = (function () {
    function CycleController(_gameServer) {
        this._gameServer = _gameServer;
    }
    CycleController.prototype.determineAdapter = function () {
        return new KeyboardAdapter(this.move, this);
    };
    CycleController.prototype.move = function (direction) {
        this._gameServer.server.Move(direction);
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
