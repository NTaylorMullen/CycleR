///<reference path="MovementControllers/MovementController.ts" />

class Collidable {
    public MovementController: MovementController;
    public Disposed: bool;
    public ID: number;
    public Alive: bool;

    constructor (id: number) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
    }

    public HandleCollisionWith(obj: Collidable): void {
    }
}