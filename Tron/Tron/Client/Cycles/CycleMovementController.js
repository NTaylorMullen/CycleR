var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CycleMovementController = (function (_super) {
    __extends(CycleMovementController, _super);
    function CycleMovementController(_context, startVelocity) {
        _super.call(this, _context, startVelocity, CycleMovementController.MAX_SPEED);
        this._context = _context;
        this._context.position.y = CycleMovementController.Y_OFFSET;
    }
    CycleMovementController.MAX_SPEED = 700;
    CycleMovementController.Y_OFFSET = 35;
    CycleMovementController.prototype.positionOnLine = function () {
        if(this.Velocity.z !== 0) {
            this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.z / Math.abs(this.Velocity.z));
        } else {
            if(this.Velocity.x !== 0) {
                this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.x / Math.abs(this.Velocity.x));
            }
        }
    };
    CycleMovementController.prototype.swapXZVelocity = function () {
        var temp = this.Velocity.x;
        this.Velocity.x = this.Velocity.z;
        this.Velocity.z = temp;
    };
    CycleMovementController.prototype.Move = function (direction) {
        this.positionOnLine();
        if(direction === "Left") {
            this._context.rotation.y += (Math.PI / 2);
            this.Velocity.x *= -1;
        } else {
            if(direction === "Right") {
                this._context.rotation.y -= (Math.PI / 2);
                this.Velocity.z *= -1;
            }
        }
        this.swapXZVelocity();
    };
    CycleMovementController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        var incrementor = this.Velocity.clone().multiplyScalar(gameTime.FractionOfSecond);
        this._context.position.addSelf(incrementor);
    };
    return CycleMovementController;
})(MovementController);
//@ sourceMappingURL=CycleMovementController.js.map
