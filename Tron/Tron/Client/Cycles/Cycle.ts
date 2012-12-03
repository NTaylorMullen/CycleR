/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Trails/TrailManager.ts" />
/// <reference path="../Collidables/Collidable.ts" />
/// <reference path="CycleMovementController.ts" />

class Cycle extends Collidable {
    static BASE_CYCLE_SCALE: IVector3 = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    static SCALE: IVector3 = new THREE.Vector3(37.22342991572615, 40, 35);
    static SIZE: IVector2 = new THREE.Vector2(200, 100);

    public Context: IMesh;
    public MovementController: CycleMovementController;
    public TrailManager: TrailManager;

    constructor (startPosition: IVector3, startVelocity: IVector3, id: number, rawModel: IGeometry, trailColor: number) {
        super(id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;

        this.MovementController = new CycleMovementController(this.Context, startVelocity);
        this.TrailManager = new TrailManager(trailColor, this);
    }

    private createContext(rawModel: IGeometry): IMesh {
        var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        context.scale = Cycle.SCALE;

        return context;
    }

    public Move(direction: string): void {
        this.MovementController.Move(direction);
        this.TrailManager.StartTrail(this.MovementController.Velocity, this.Context.position);
    }

    public Update(gameTime: GameTime): void {
        this.MovementController.Update(gameTime);
        this.TrailManager.Update(gameTime);
    }
}