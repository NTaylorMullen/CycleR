/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="EnvironmentRenderer.ts" />
/// <reference path="MapRenderer.ts" />
/// <reference path="CoreRenderer.ts" />

class GameRenderer {
    private _scene: IScene;
    private _environmentRenderer: EnvironmentRenderer;
    private _mapRenderer: MapRenderer;
    private _coreRenderer: CoreRenderer;

    constructor (gameCamera: Camera) {
        this._scene = new THREE.Scene();

        this._environmentRenderer = new EnvironmentRenderer(this._scene);
        this._mapRenderer = new MapRenderer(this._scene);
        this._coreRenderer = new CoreRenderer(this._scene, gameCamera);
    }

    public Add(object: IObject3D): void {
        this._scene.add(object);
    }

    public Draw(): void {
        this._coreRenderer.Draw();
    }
}