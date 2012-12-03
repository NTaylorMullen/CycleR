/// <reference path="GameScreen.ts" />
/// <reference path="../GameCore/Game.ts" />
/// <reference path="../PayloadManagement/PayloadDecompressor.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class MainGame extends GameScreen {
    static NAME: string = "MainGame";

    private _game: Game;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(MainGame.NAME, onCompletion, gameServer);

        this.GameServer.client.startGame = (initialPayload: any) => {
            this._game.Start(PayloadDecompressor.DecompressPayload(initialPayload));
        };
    }

    public Load(): void {
        if (!this._game) {
            this._game = new Game(this.GameServer);
        }
    }
}