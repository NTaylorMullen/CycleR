/// <reference path="../Collidables/MovementControllers/MovementController.ts" />
/// <reference path="../Space/Map.ts" />

class CycleMovementController extends MovementController {
    static MAX_SPEED: number = 1000;
    static Y_OFFSET: number = 35;

    static HALF_PI: number = Math.PI / 2;
    static TWO_PI: number = Math.PI * 2;

    static Velocities: IVector3[];

    constructor(private _context: IMesh, startVelocity: IVector3) {
        super(_context, startVelocity, CycleMovementController.MAX_SPEED);

        this._context.position.y = 50;//CycleMovementController.Y_OFFSET;

        if (!CycleMovementController.Velocities) {
            this.calculateVelocities();
        }
    }

    private calculateVelocities(): void {
        CycleMovementController.Velocities = [];
        CycleMovementController.Velocities[0] = new THREE.Vector3(0, 0, -CycleMovementController.MAX_SPEED);
        CycleMovementController.Velocities[Math.round(CycleMovementController.HALF_PI)] = new THREE.Vector3(-CycleMovementController.MAX_SPEED, 0, 0);
        CycleMovementController.Velocities[Math.round(Math.PI)] = new THREE.Vector3(0, 0, CycleMovementController.MAX_SPEED);
        CycleMovementController.Velocities[Math.round(Math.PI + CycleMovementController.HALF_PI)] = new THREE.Vector3(CycleMovementController.MAX_SPEED, 0, 0);
    }

    private positionOnLine(): void {
        var currentVelocity,
            wasZero = false;

        // If our velocity was zero then deterine the velocity based on the current rotation (This happens when we've collided)
        if (this.Velocity.isZero())
        {
            wasZero = true;
            currentVelocity = CycleMovementController.Velocities[Math.round(this._context.rotation.y)];
        }
        else
        {
            currentVelocity = this.Velocity;
        }

        if (currentVelocity.z !== 0) {
            this._context.position.z -= (this._context.position.z % Map.FLOOR_TILE_SIZE.Width);

            if (wasZero) {
                this._context.position.z -= Map.FLOOR_TILE_SIZE.Width * (currentVelocity.z / Math.abs(currentVelocity.z));
            }
        }
        else if (currentVelocity.x !== 0) {
            this._context.position.x -= (this._context.position.x % Map.FLOOR_TILE_SIZE.Width);

            if (wasZero) {
                this._context.position.x -= Map.FLOOR_TILE_SIZE.Width * (currentVelocity.x / Math.abs(currentVelocity.x));
            }
        }
    }

    public Move(direction: string): void {
        this.positionOnLine();

        if (direction === "Left") {
            this._context.rotation.y = (this._context.rotation.y + CycleMovementController.HALF_PI) % CycleMovementController.TWO_PI;

            if (Math.round(this._context.rotation.y) == 6) { // Above two pi            
                this._context.rotation.y = 0;
            }
        }
        else if (direction === "Right") {
            this._context.rotation.y -= CycleMovementController.HALF_PI;

            if (this._context.rotation.y < 0) {
                if (Math.round(this._context.rotation.y) === 0) {
                    this._context.rotation.y = 0;
                }
                else {
                    this._context.rotation.y += CycleMovementController.TWO_PI;
                }
            }
        }

        this.Velocity = CycleMovementController.Velocities[Math.round(this._context.rotation.y)];
    }

    public Update(gameTime: GameTime): void {
        super.Update(gameTime);

        var incrementor: IVector3 = this.Velocity.clone().multiplyScalar(gameTime.FractionOfSecond);
        this._context.position.addSelf(incrementor);
    }
}