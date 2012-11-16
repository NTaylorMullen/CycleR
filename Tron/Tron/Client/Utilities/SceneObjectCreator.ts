/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

class SceneObjectCreator {
    private _pendingObjects: IObject3D[];

    constructor () {
        this._pendingObjects = [];
    }

    public AddToScene(object: IObject3D): void {
        this._pendingObjects.push(object);
    }

    public AddAllToScene(objects: IObject3D[]): void {
        this._pendingObjects = this._pendingObjects.concat(objects);
    }

    public GetPendingObjects(): IObject3D[] {
        if (this._pendingObjects.length !== 0) {
            var objects = this._pendingObjects;
            this._pendingObjects = [];
            return objects;
        }
        else {
            return [];
        }
    }
}