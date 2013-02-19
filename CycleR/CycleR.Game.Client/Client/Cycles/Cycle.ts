/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Trails/TrailManager.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Collidables/Collidable.ts" />
/// <reference path="CycleMovementController.ts" />
/// <reference path="../Space/MapLocation.ts" />

class Cycle extends Collidable {
    static BASE_CYCLE_SCALE: IVector3 = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    static SCALE: IVector3 = new THREE.Vector3(37.22342991572615, 40, 35);
    static SIZE: IVector2 = new THREE.Vector2(200, 100);

    public static Events: ICycleEvents = {
        OnCollision: "OnCollision"
    }

    public CollisionHandled: bool;
    public Context: IMesh;
    public MovementController: CycleMovementController;
    public TrailManager: TrailManager;    

    constructor(startPosition: IVector3, startVelocity: IVector3, id: number, rawModel: IGeometry, private _trailColor: number) {
        super(id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;

        this.MovementController = new CycleMovementController(this.Context, startVelocity);
        this.TrailManager = new TrailManager(_trailColor, this);
    }

    private createContext(rawModel: IGeometry): IMesh {
        //var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        var context = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        context.scale = new THREE.Vector3(100, 100, 100);//Cycle.SCALE;

        return context;
    }

    public HandleCollision(payload: ICollisionPayloadDecompressed): void {
        this.Context.position = payload.CollidedAt;
        this.MovementController.Velocity = new THREE.Vector3(); // 0 out the velocity

        super.HandleCollision(payload);

        $(this).triggerHandler(Cycle.Events.OnCollision);
    }

    public Die(diedAt: IVector3): void {
        this.TrailManager.CurrentTrail.ExtendTo(diedAt);
    }

    public Move(direction: string): void {
        this.MovementController.Move(direction);

        if (!this.MovementController.Velocity.isZero()) {
            this.Colliding = false;
        }

        this.TrailManager.StartTrail(this.MovementController.Velocity, this.Context.position);
    }

    public Update(gameTime: GameTime): void {
        this.MovementController.Update(gameTime);
        this.TrailManager.Update(gameTime);
    }
}