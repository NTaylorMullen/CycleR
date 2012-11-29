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
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(onCompletion, gameServer) {
        _super.call(this, MainMenu.NAME, onCompletion, gameServer);
    }
    MainMenu.NAME = "MainMenu";
    return MainMenu;
})(GameScreen);
