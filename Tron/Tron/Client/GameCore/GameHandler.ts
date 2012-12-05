/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../GameCore/GameTime.ts" />
/// <reference path="../ModelHelpers/ModelLibrary.ts" />
/// <reference path="../Cycles/CycleManager.ts" />
/// <reference path="../Controllers/CycleController.ts" />
/// <reference path="../Cameras/Camera.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="../ConnectionManagement/ConnectionManager.ts" />

class GameHandler extends SceneObjectCreator {
    private _cycleManager: CycleManager;
    private _cycleController: CycleController;
    private _camera: Camera;
    private _map: Map;

    constructor (gameServer: IHubProxy, camera: Camera) {
        super();

        this._camera = camera;
        this._cycleManager = new CycleManager();
        this._map = new Map();
        this._cycleController = new CycleController(gameServer);
    }

    public Initialize(cycles: Cycle[]): void {
        this._cycleManager.AddAll(cycles);
        this._map.AddAll(cycles);

        this._cycleController.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID]);
        var controller: AttachedCameraController = <AttachedCameraController>this._camera.GetController();
        if (controller.AttachTo) {
            controller.AttachTo(this._cycleManager.Cycles[ConnectionManager.UserID].Context);
        }
    }

    public ServerMovementPayload(payload: IMovementPayloadDecompressed): void {
        this._cycleManager.ServerMovementPayload(payload);
    }

    public Update(gameTime: GameTime): void {
        // Need to add all pending objects to our pending objects list so they can be added to the scene
        this.AddAllToScene(this._cycleManager.GetPendingObjects());
        this.AddAllToScene(this._map.GetPendingObjects());

        this._cycleManager.Update(gameTime);
        this._map.Update(gameTime);
    }
}