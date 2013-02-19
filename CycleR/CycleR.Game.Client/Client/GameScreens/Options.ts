/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class Options extends GameScreen {
    static NAME: string = "Options";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(Options.NAME, onCompletion, gameServer);
    }
}