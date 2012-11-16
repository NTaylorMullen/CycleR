var CycleController = (function () {
    function CycleController(_cycle) {
        this._cycle = _cycle;
        this._adapter = this.determineAdapter();
    }
    CycleController.prototype.determineAdapter = function () {
        return new KeyboardAdapter(this._cycle.Move, this._cycle);
    };
    CycleController.prototype.move = function (direction) {
    };
    return CycleController;
})();
