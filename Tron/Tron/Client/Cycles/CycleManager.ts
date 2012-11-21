/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="Cycle.ts" />

class CycleManager extends SceneObjectCreator {
    public Cycles: { [ID: number]: Cycle; };

    constructor () {
        super();
        this.Cycles = <{ [ID: number]: Cycle; }>{};
    }

    public Add(cycle: Cycle): void {
        this.Cycles[cycle.ID] = cycle;
        this.AddToScene(cycle.Context);
    }

    public Update(gameTime: GameTime): void {
        for (var id in this.Cycles) {
            this.Cycles[id].Update(gameTime);
        }
    }
}