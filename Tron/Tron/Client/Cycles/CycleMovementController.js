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
        if(!CycleMovementController.Velocities) {
            this.calculateVelocities();
        }
    }
    CycleMovementController.MAX_SPEED = 1000;
    CycleMovementController.Y_OFFSET = 35;
    CycleMovementController.HALF_PI = Math.PI / 2;
    CycleMovementController.TWO_PI = Math.PI * 2;
    CycleMovementController.Velocities = null;
    CycleMovementController.prototype.calculateVelocities = function () {
        CycleMovementController.Velocities = [];
        CycleMovementController.Velocities[0] = new THREE.Vector3(0, 0, -CycleMovementController.MAX_SPEED);
        CycleMovementController.Velocities[Math.round(CycleMovementController.HALF_PI)] = new THREE.Vector3(-CycleMovementController.MAX_SPEED, 0, 0);
        CycleMovementController.Velocities[Math.round(Math.PI)] = new THREE.Vector3(0, 0, CycleMovementController.MAX_SPEED);
        CycleMovementController.Velocities[Math.round(Math.PI + CycleMovementController.HALF_PI)] = new THREE.Vector3(CycleMovementController.MAX_SPEED, 0, 0);
    };
    CycleMovementController.prototype.positionOnLine = function () {
        if(this.Velocity.z !== 0) {
            this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.z / Math.abs(this.Velocity.z));
        } else {
            if(this.Velocity.x !== 0) {
                this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.x / Math.abs(this.Velocity.x));
            } else {
                this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width);
                this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width);
            }
        }
    };
    CycleMovementController.prototype.Move = function (direction) {
        this.positionOnLine();
        if(direction === "Left") {
            this._context.rotation.y = (this._context.rotation.y + CycleMovementController.HALF_PI) % CycleMovementController.TWO_PI;
            if(Math.round(this._context.rotation.y) == 6) {
                this._context.rotation.y = 0;
            }
        } else {
            if(direction === "Right") {
                this._context.rotation.y -= CycleMovementController.HALF_PI;
                if(this._context.rotation.y < 0) {
                    if(Math.round(this._context.rotation.y) === 0) {
                        this._context.rotation.y = 0;
                    } else {
                        this._context.rotation.y += CycleMovementController.TWO_PI;
                    }
                }
            }
        }
        this.Velocity = CycleMovementController.Velocities[Math.round(this._context.rotation.y)];
    };
    CycleMovementController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        var incrementor = this.Velocity.clone().multiplyScalar(gameTime.FractionOfSecond);
        this._context.position.addSelf(incrementor);
    };
    return CycleMovementController;
})(MovementController);
//@ sourceMappingURL=CycleMovementController.js.map
