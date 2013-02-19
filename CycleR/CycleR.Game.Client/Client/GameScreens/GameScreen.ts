/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class GameScreen {
    public Name: string;
    public Running: bool;

    constructor (name: string, private _onCompletion: Function, public GameServer: IHubProxy) {
        this.Name = name;
        this.Running = false;
    }

    public Load(): void {
        this.Running = true;
    }

    public Done(nextScreen: string): void {
        this.Running = false;
        this._onCompletion(nextScreen);
    }
}