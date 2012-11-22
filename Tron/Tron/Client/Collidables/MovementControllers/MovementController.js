var GameTime = (function () {
    function GameTime() {
        this.StartedAt = new Date();
        this.Now = this.LastUpdated = this.StartedAt;
        this.ElapsedGameTime = 0;
        this.FPS = 0;
        this.FractionOfSecond = 0;
    }
    GameTime.prototype.TotalGameTime = function () {
        return this.Now.getTime() - this.StartedAt.getTime();
    };
    GameTime.prototype.Update = function () {
        this.LastUpdated = this.Now;
        this.Now = new Date();
        this.ElapsedGameTime = this.Now.getTime() - this.LastUpdated.getTime();
        this.FPS = 1000 / this.ElapsedGameTime;
        this.FractionOfSecond = this.ElapsedGameTime / 1000;
    };
    return GameTime;
})();
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
