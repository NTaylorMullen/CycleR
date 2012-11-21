/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="Adapters/KeyboardAdapter.ts" />

class CycleController {
    private _adapter: IAdapter;
    private _cycle: Cycle;

    constructor (private _gameHub: IHubProxy) {
    }

    private determineAdapter(): IAdapter {
        // TODO: implement touch adapter/mouse adapter
        return new KeyboardAdapter(this._cycle.Move, this._cycle);
    }

    private move(direction: string): void {
    }

    public AttachTo(cycle: Cycle): void {
        this._cycle = cycle;
        this._adapter = this.determineAdapter();
        this._adapter.Activate();
    }

    public Detach(): void {
        this._adapter.Deactivate();
        this._adapter = null;
    }
}