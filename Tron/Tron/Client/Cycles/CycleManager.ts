/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="Cycle.ts" />

class CycleManager extends SceneObjectCreator {
    constructor () {
        super();


    }

    public Add(cycle: Cycle): void {
        this.AddToScene(cycle.Context);
    }
}