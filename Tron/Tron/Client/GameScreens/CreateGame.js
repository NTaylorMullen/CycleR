var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CreateGame = (function (_super) {
    __extends(CreateGame, _super);
    function CreateGame(onCompletion, gameHub) {
        _super.call(this, CreateGame.NAME, onCompletion, gameHub);
    }
    CreateGame.NAME = "CreateGame";
    return CreateGame;
})(GameScreen);
