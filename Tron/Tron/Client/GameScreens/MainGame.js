var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, MainGame.NAME, onCompletion, gameServer);
        this.GameServer.client.startGame = function (initialPayload) {
            console.log("Game Started!");
            _this._game.Start(PayloadDecompressor.DecompressInitializationPayload(initialPayload));
        };
        this.GameServer.client.movementPayload = function (payload) {
            _this._game.ServerMovementPayload(PayloadDecompressor.DecompressMovementPayload(payload));
        };
        this.GameServer.client.deathPayload = function (payload) {
            _this._game.ServerDeathPayload(PayloadDecompressor.DecompressDeathPayload(payload));
        };
    }
    MainGame.NAME = "MainGame";
    MainGame.prototype.Load = function () {
        if(!this._game) {
            this._game = new Game(this.GameServer);
        }
    };
    return MainGame;
})(GameScreen);
//@ sourceMappingURL=MainGame.js.map
