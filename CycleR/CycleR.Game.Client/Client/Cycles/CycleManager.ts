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

    public AddAll(cycles: Cycle[]): void {
        for (var i: number = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    }

    public Add(cycle: Cycle): void {
        this.Cycles[cycle.ID] = cycle;
        this.AddToScene(cycle.Context);
    }

    public Remove(cycleID: number): Cycle {
        var cycle = this.Cycles[cycleID];

        delete this.Cycles[cycleID];

        return cycle;
    }

    public ServerMovementPayload(payload: IMovementPayloadDecompressed): void {
        var cycle = this.Cycles[payload.ID];
        cycle.Context.position = payload.Position;
        cycle.MovementController.HeadLocation = Map.Utilities.ToMapLocation(cycle.Context.position);
        cycle.Move(payload.Direction);
    }

    public Update(gameTime: GameTime): void {
        for (var id in this.Cycles) {
            this.Cycles[id].Update(gameTime);
        }
    }
}