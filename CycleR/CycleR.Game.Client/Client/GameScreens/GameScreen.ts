/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class GameScreen {
    public Name: string;
    public Running: bool;

    private _lastScreen: string;

    constructor (name: string, private _onCompletion: Function, public GameServer: IHubProxy) {
        this.Name = name;
        this.Running = false;
    }

    public Load(lastScreen?: string): void {
        this.Running = true;
        this._lastScreen = lastScreen;
    }

    public Done(nextScreen?: string): void {
        this.Running = false;

        if (!nextScreen) {
            nextScreen = this._lastScreen;
        }

        this._onCompletion(nextScreen, this.Name);
    }
}