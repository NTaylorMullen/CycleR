var GameScreen = (function () {
    function GameScreen(name, _onCompletion, GameServer) {
        this._onCompletion = _onCompletion;
        this.GameServer = GameServer;
        this.Name = name;
        this.Running = false;
    }
    GameScreen.prototype.Load = function (lastScreen) {
        this.Running = true;
        this._lastScreen = lastScreen;
    };
    GameScreen.prototype.Done = function (nextScreen) {
        this.Running = false;
        if(!nextScreen) {
            nextScreen = this._lastScreen;
        }
        this._onCompletion(nextScreen, this.Name);
    };
    return GameScreen;
})();
//@ sourceMappingURL=GameScreen.js.map
