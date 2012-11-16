/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Game/GameTime.ts" />
/// <reference path="FreeCameraController.ts" />
/// <reference path="AttachedCameraController.ts" />

class Camera {
    static DISTANCE: number = 1000;

    public Mode: string;
    public Context: IPerspectiveCamera;

    private _controllers: { [s: string]: CameraController; };

    constructor (private _renderer: IRenderer) {        
        this.initializeGameCamera();

        this.Mode = FreeCameraController.MODE;
        this.initializeCameraControllers();
    }

    private initializeGameCamera() {
        this.Context = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.Context.position.z = Camera.DISTANCE;
        this.Context.position.y = 200;
    }

    private initializeCameraControllers() {
        this._controllers = {
            Free: new FreeCameraController(this.Context, this._renderer),
            Attached: new AttachedCameraController(this.Context, this._renderer)
        };
    }

    public Update(gameTime: GameTime): void {
        this._controllers[this.Mode].Update(gameTime);
    }
}