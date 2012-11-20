/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class FindGame extends GameScreen {
    static NAME: string = "FindGame";

    constructor (onCompletion: Function, gameHub: IHubProxy) {
        super(FindGame.NAME, onCompletion, gameHub);
    }
}