/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="Adapters/KeyboardAdapter.ts" />

class CycleController {
    private _adapter: IAdapter;
    private _cycle: Cycle;

    constructor (private _gameServer: IHubProxy) {
    }

    private determineAdapter(): IAdapter {
        // TODO: implement touch adapter/mouse adapter
        return new KeyboardAdapter(this.move, this);
    }

    private move(direction: string): void {
        this._gameServer.server.Move(direction);
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