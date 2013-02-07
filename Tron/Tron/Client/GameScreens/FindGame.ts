/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class FindGame extends GameScreen {
    static NAME: string = "FindGame";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(FindGame.NAME, onCompletion, gameServer);
    }

    public Load(): void {
        console.log("Find Game loaded!");
        console.log("Loading 'loading' screen...");
        super.Done(Loading.NAME);
    }
}