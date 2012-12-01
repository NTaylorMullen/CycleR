/// <reference path="GameScreen.ts" />
/// <reference path="../GameCore/Game.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class MainGame extends GameScreen {
    static NAME: string = "MainGame";

    private _game: Game;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(MainGame.NAME, onCompletion, gameServer);
    }

    public Load(): void {
        if (!this._game) {
            this._game = new Game(this.GameServer);
        }
    }
}