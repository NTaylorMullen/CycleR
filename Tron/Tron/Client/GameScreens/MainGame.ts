/// <reference path="GameScreen.ts" />
/// <reference path="../GameCore/Game.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class MainGame extends GameScreen {
    static NAME: string = "MainGame";

    private _game: Game;

    constructor (onCompletion: Function, gameHub: IHubProxy) {
        super(MainGame.NAME, onCompletion, gameHub);
    }

    public Load(): void {
        if (!this._game) {
            this._game = new Game(this.GameHub);
        }
    }
}