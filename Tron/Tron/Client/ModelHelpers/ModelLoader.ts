/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

class ModelLoader {
    private _jsonLoader: IJSONLoader;
    private _models: { [s: string]: IGeometry; };

    constructor () {
         this._jsonLoader = new THREE.JSONLoader()
         this._models = {};
    }

    public LoadModel(loadRequest: IModelLoadRequest): void {
        this._jsonLoader.load(loadRequest.FilePath, (geometry: IGeometry) => {
            this._models[loadRequest.ModelName] = geometry;

            /*var mesh: IMesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
            mesh.scale.set(40, 40, 35);
            this._scene.add(mesh);*/
        }, loadRequest.TexturePath);
    }

    public LoadModels(filesToLoad: IModelLoadRequest[]) {
        for (var i = 0; i < filesToLoad.length; i++) {
            this.LoadModel(filesToLoad[i]);
        }
    }

    public GetModel(name: string): IGeometry {
        if (this._models[name]) {
            return this._models[name];
        }
        else {
            throw new Error("Model '" + name + "' has not been loaded.");
        }
    }
}