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
            _this._game.Start(PayloadDecompressor.DecompressPayload(initialPayload));
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
