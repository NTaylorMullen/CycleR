/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class Loading extends GameScreen {
    static NAME: string = "Loading";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(Loading.NAME, onCompletion, gameServer);

        this.GameServer.client.configure = this.configureGame;
    }

    private configureGame(configuration): void {

    }
}