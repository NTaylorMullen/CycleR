/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Collidables/Collidable.ts" />
/// <reference path="CycleMovementController.ts" />

class Cycle extends Collidable {
    static BASE_CYCLE_SCALE: IVector3 = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    static SCALE: IVector3 = new THREE.Vector3(37.22342991572615, 40, 35);
    static SIZE: IVector3 = (new THREE.Vector3()).multiply(Cycle.BASE_CYCLE_SCALE, Cycle.SCALE);

    public Context: IMesh;
    public MovementController: CycleMovementController;

    constructor (startPosition: IVector3, id: number, rawModel: IGeometry) {
        super(id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;

        this.MovementController = new CycleMovementController(this.Context);
    }

    private createContext(rawModel: IGeometry): IMesh {
        var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        context.scale = Cycle.SCALE;

        return context;
    }

    public Move(direction: string): void {
        this.MovementController.Move(direction);
    }

    public Update(gameTime: GameTime): void {
        this.MovementController.Update(gameTime);
    }
}