/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class Options extends GameScreen {
    static NAME: string = "Options";

    private _menu: Menu;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(Options.NAME, onCompletion, gameServer);
    }
}