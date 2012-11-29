var GameScreen = (function () {
    function GameScreen(name, _onCompletion, GameServer) {
        this._onCompletion = _onCompletion;
        this.GameServer = GameServer;
        this.Name = name;
        this.Running = false;
    }
    GameScreen.prototype.Load = function () {
        this.Running = true;
    };
    GameScreen.prototype.Done = function (nextScreen) {
        this.Running = false;
        this._onCompletion(nextScreen);
    };
    return GameScreen;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CreateGame = (function (_super) {
    __extends(CreateGame, _super);
    function CreateGame(onCompletion, gameServer) {
        _super.call(this, CreateGame.NAME, onCompletion, gameServer);
    }
    CreateGame.NAME = "CreateGame";
    return CreateGame;
})(GameScreen);
