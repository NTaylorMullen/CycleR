var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FindGame = (function (_super) {
    __extends(FindGame, _super);
    function FindGame(onCompletion, gameHub) {
        _super.call(this, FindGame.NAME, onCompletion, gameHub);
    }
    FindGame.NAME = "FindGame";
    return FindGame;
})(GameScreen);
