var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame(onCompletion, gameHub) {
        _super.call(this, MainGame.NAME, onCompletion, gameHub);
    }
    MainGame.NAME = "MainGame";
    MainGame.prototype.Load = function () {
        if(!this._game) {
            this._game = new Game(this.GameHub);
        }
    };
    return MainGame;
})(GameScreen);
