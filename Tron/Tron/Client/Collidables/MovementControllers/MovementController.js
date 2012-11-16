var MovementController = (function () {
    function MovementController(_context, Speed) {
        this._context = _context;
        this.Speed = Speed;
        this.Velocity = new THREE.Vector3();
    }
    MovementController.prototype.Update = function (gameTime) {
    };
    return MovementController;
})();
