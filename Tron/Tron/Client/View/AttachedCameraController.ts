/// <reference path="CameraController.ts" />

class AttachedCameraController extends CameraController {
    static MODE: string = "Attached";

    constructor (camera: ICamera, renderer: IRenderer) {
        super(camera, renderer);
    }
}