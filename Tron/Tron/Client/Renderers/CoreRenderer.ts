/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../View/Camera.ts" />
/// <reference path="../Game/GameTime.ts" />

class CoreRenderer {
    private _renderer: IRenderer;    

    constructor (private _scene: IScene) { 
    }

    private determineRenderer(): IRenderer {
        if (THREE.Detector.webgl) {
            return new THREE.WebGLRenderer();
        }
        else if (THREE.Detector.canvas) {
            return new THREE.CanvasRenderer();
        }
        else {
            alert("Your browser does not support 3D techniques.  Please try again in a newer browser.");
        }
    }

    public Initialize(): IRenderer {
        this._renderer = this.determineRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        $("body").append(this._renderer.domElement);

        return this._renderer;
    }

    public Draw(camera: Camera): void {
        this._renderer.render(this._scene, camera.Context);
    }
}