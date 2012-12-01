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
//@ sourceMappingURL=GameScreen.js.map
