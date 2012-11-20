/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class CreateGame extends GameScreen {
    static NAME: string = "CreateGame";

    constructor (onCompletion: Function, gameHub: IHubProxy) {
        super(CreateGame.NAME, onCompletion, gameHub);
    }
}