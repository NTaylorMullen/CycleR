/// <reference path="CameraController.ts" />
/// <reference path="../GameCore/GameTime.ts" />

class FreeCameraController extends CameraController {
    static MODE: string = "Free";
    static MOVE_SPEED: number = 1000;
    static LOOK_SPEED: number = .075;

    private _controls: IFirstPersonControls;

    constructor (camera: ICamera, renderer: IRenderer) {
        super(camera, renderer);
        this.initializeCamera(camera);
    }

    private initializeCamera(camera: ICamera): void {
        this._controls = new THREE.FirstPersonControls(camera);
        this._controls.movementSpeed = FreeCameraController.MOVE_SPEED;
	    this._controls.lookSpeed = FreeCameraController.LOOK_SPEED;
    }

    public Update(gameTime: GameTime): void {
        super.Update(gameTime);
        this._controls.update(gameTime.FractionOfSecond);
    }
}