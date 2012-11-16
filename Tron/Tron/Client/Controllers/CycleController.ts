/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="Adapters/KeyboardAdapter.ts" />

class CycleController {
    private _adapter: IAdapter;

    constructor (private _cycle: Cycle) {
        this._adapter = this.determineAdapter();
    }

    private determineAdapter(): IAdapter {
        // TODO: implement touch adapter/mouse adapter
        return new KeyboardAdapter(this._cycle.Move, this._cycle);
    }

    private move(direction: string): void {

    }
}