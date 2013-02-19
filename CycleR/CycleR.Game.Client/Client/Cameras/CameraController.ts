/// <reference path="../Interfaces/ThreeJS/three.d.ts" />

class CameraController {
    constructor (private _camera: ICamera, renderer: IRenderer) {
        this.applyKeyboardMappings();
    }

    private applyKeyboardMappings() {
    }

    public Update(gameTime: GameTime): void {
    }
}