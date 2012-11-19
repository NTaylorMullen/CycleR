/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../GameCore/GameTime.ts" />
/// <reference path="../ModelHelpers/ModelLibrary.ts" />
/// <reference path="../Cycles/CycleManager.ts" />
/// <reference path="../Controllers/CycleController.ts" />
/// <reference path="../Cameras/Camera.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />

class GameHandler extends SceneObjectCreator {
    private _cycleManager: CycleManager;
    private _cycleController: CycleController;
    private _camera: Camera;

    private _models: { [s: string]: IGeometry; };

    constructor (camera: Camera) {
        super();

        this._camera = camera;
        this._cycleManager = new CycleManager();
    }

    public ModelsLoaded(models: { [s: string]: IGeometry; }) {
        this._models = models;

        var c: Cycle = new Cycle(new THREE.Vector3(0,35,0), 0, this._models[ModelLibrary.Cycle.ModelName]);
        this._cycleManager.Add(c);
        this._cycleController = new CycleController(c);
        
        var controller: AttachedCameraController = <AttachedCameraController>this._camera.GetController();
        controller.AttachTo(c.Context);
    }

    public Update(gameTime: GameTime): void {
        // Need to add all pending objects to our pending objects list so they can be added to the scene
        this.AddAllToScene(this._cycleManager.GetPendingObjects());

        this._cycleManager.Update(gameTime);
    }
}