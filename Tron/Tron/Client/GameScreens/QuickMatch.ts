/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class QuickMatch extends GameScreen {
    static NAME: string = "QuickMatch";

    constructor (onCompletion: Function, gameHub: IHubProxy) {
        super(QuickMatch.NAME, onCompletion, gameHub);
    }
}