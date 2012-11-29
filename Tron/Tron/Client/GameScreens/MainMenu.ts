/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class MainMenu extends GameScreen {
    static NAME: string = "MainMenu";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(MainMenu.NAME, onCompletion, gameServer);
    }
}