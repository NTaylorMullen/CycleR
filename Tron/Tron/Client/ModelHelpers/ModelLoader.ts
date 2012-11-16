/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

class ModelLoader {
    private _jsonLoader: IJSONLoader;
    private _models: { [s: string]: IGeometry; };

    constructor () {
         this._jsonLoader = new THREE.JSONLoader()
         this._models = {};
    }

    public LoadModel(loadRequest: IModelLoadRequest, done?: Function): void {
        this._jsonLoader.load(loadRequest.FilePath, (geometry: IGeometry) => {
            this._models[loadRequest.ModelName] = geometry;

            if (done) {
                done();
            }
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

    public GetModels(): { [s: string]: IGeometry; } {
        return this._models;
    }
}