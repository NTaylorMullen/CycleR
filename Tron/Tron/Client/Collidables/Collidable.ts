///<reference path="MovementControllers/MovementController.ts" />

class Collidable {
    public MovementController: MovementController;
    public Disposed: bool;
    public ID: number;
    public Alive: bool;
    public Collided: bool;
    public CollidedAt: IVector3;    

    constructor (id: number) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
        this.Collided = false;
        this.CollidedAt = new THREE.Vector3();
    }
}