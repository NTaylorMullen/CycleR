/// <reference path="../Collidables/MovementControllers/MovementController.ts" />
/// <reference path="../Space/Map.ts" />

class CycleMovementController extends MovementController {
    static MAX_SPEED: number = 700;

    constructor (private _context: IMesh) {
        super(_context, CycleMovementController.MAX_SPEED);

        this.Velocity.z = -CycleMovementController.MAX_SPEED;
    }

    private positionOnLine(): void {        
        if (this.Velocity.z !== 0) {
            this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.z / Math.abs(this.Velocity.z));
        }
        else if (this.Velocity.x !== 0) {
            this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (this.Velocity.x / Math.abs(this.Velocity.x));
        }
    }

    private swapXZVelocity(): void {
        // Swap x and z, aka perform movement switch
        var temp = this.Velocity.x;
        this.Velocity.x = this.Velocity.z;
        this.Velocity.z = temp; 
    }

    public Move(direction: string): void {
        this.positionOnLine();

        if (direction === "Left") {
            this._context.rotation.y += (Math.PI / 2);

            this.Velocity.x *= -1;
        }
        else if (direction === "Right") {
            this._context.rotation.y -= (Math.PI / 2);

            this.Velocity.z *= -1;
        }

        this.swapXZVelocity();
    }

    public Update(gameTime: GameTime): void {
        super.Update(gameTime);
        
        var incrementor: IVector3 = this.Velocity.clone().multiplyScalar(gameTime.FractionOfSecond);
        this._context.position.addSelf(incrementor);
    }
}