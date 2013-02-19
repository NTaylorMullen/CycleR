///<reference path="MovementControllers/MovementController.ts" />

class Collidable {
    public MovementController: MovementController;
    public Disposed: bool;
    public ID: number;
    public Alive: bool;
    public Colliding: bool;

    constructor (id: number) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
        this.Colliding = false;
    }

    public HandleCollision(payload: ICollisionPayloadDecompressed): void {
        this.Colliding = true;
    }
}