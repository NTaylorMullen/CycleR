///<reference path="MovementControllers/MovementController.ts" />

class Collidable {
    public MovementController: MovementController;
    public Disposed: bool;
    public ID: number;

    constructor (id: number) {
        this.Disposed = false;
        this.ID = id;
    }
}