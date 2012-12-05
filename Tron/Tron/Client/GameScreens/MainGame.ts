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
            console.log("Game Started!");
            this._game.Start(PayloadDecompressor.DecompressInitializationPayload(initialPayload));
        };

        this.GameServer.client.movementPayload = (payload: any) => {
            this._game.ServerMovementPayload(PayloadDecompressor.DecompressMovementPayload(payload));
        };

        this.GameServer.client.deathPayload = (payload: any) => {
            this._game.ServerDeathPayload(PayloadDecompressor.DecompressDeathPayload(payload));
        };
    }

    public Load(): void {
        if (!this._game) {
            this._game = new Game(this.GameServer);
        }
    }
}