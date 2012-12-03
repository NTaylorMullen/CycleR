/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

module ModelLoader {
    var jsonLoader: IJSONLoader = new THREE.JSONLoader();
    var models: { [s: string]: IGeometry; } = {};

    export function LoadModel(loadRequest: IModelLoadRequest, done?: Function): void {
        jsonLoader.load(loadRequest.FilePath, (geometry: IGeometry) => {
            models[loadRequest.ModelName] = geometry;

            if (done) {
                done();
            }
        }, loadRequest.TexturePath);
    }

    export function LoadModels(filesToLoad: IModelLoadRequest[]) {
        for (var i = 0; i < filesToLoad.length; i++) {
            this.LoadModel(filesToLoad[i]);
        }
    }

    export function GetModel(name: string): IGeometry {
        if (models[name]) {
            return models[name];
        }
        else {
            throw new Error("Model '" + name + "' has not been loaded.");
        }
    }

    export function GetModels(): { [s: string]: IGeometry; } {
        return models;
    }
}