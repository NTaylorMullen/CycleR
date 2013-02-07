
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="EnvironmentRenderer.ts" />
/// <reference path="MapRenderer.ts" />
/// <reference path="CoreRenderer.ts" />

class GameRenderer {
    public Renderer: IRenderer;

    private _scene: IScene;
    private _environmentRenderer: EnvironmentRenderer;
    private _mapRenderer: MapRenderer;
    private _coreRenderer: CoreRenderer;

    constructor () {
        this._scene = new THREE.Scene();

        this._environmentRenderer = new EnvironmentRenderer(this._scene);
        this._mapRenderer = new MapRenderer(this._scene);
        this._coreRenderer = new CoreRenderer(this._scene);

        this.Renderer = this._coreRenderer.Initialize();      
    }

    public Add(object: IObject3D): void {
        this._scene.add(object);
    }

    public AddAll(objects: IObject3D[]): void {
        for (var i = 0; i < objects.length; i++) {
            this._scene.add(objects[i]);
        }
    }

    public Remove(object: IObject3D): void {
        this._scene.remove(object);
    }

    public Draw(camera: Camera): void {
        this._coreRenderer.Draw(camera);
    }
}