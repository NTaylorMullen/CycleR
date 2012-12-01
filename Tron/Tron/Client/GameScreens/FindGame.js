var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FindGame = (function (_super) {
    __extends(FindGame, _super);
    function FindGame(onCompletion, gameServer) {
        _super.call(this, FindGame.NAME, onCompletion, gameServer);
    }
    FindGame.NAME = "FindGame";
    return FindGame;
})(GameScreen);
//@ sourceMappingURL=FindGame.js.map
