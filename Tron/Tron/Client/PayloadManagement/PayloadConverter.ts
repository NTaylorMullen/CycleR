/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="../ModelHelpers/ModelLibrary.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

module PayloadConverter {
    var models: { [s: string]: IGeometry; };

    export function InitializeModels(loadedModels: { [s: string]: IGeometry; }): void {
        models = loadedModels;
    }

    export function CreateCycle(cycleRaw: ICycleDecompressed): Cycle {
        var cycle: Cycle = new Cycle(cycleRaw.Position, cycleRaw.Velocity, cycleRaw.ID, models[ModelLibrary.Cycle.ModelName], cycleRaw.TrailColor);

        cycle.Alive = cycleRaw.Alive;
        cycle.Collided = cycleRaw.Collided;
        cycle.CollidedAt = cycleRaw.CollidedAt;
        cycle.Context.rotation.y = cycleRaw.Rotation;

        return cycle;
    }

    export function CreateAllCycles(cyclesRaw: ICycleDecompressed[]): Cycle[] {
        var cycles: Cycle[] = [];

        for (var i: number = cyclesRaw.length - 1; i >= 0; i--) {
            cycles.push(CreateCycle(cyclesRaw[i]));
        }

        return cycles;
    }
}