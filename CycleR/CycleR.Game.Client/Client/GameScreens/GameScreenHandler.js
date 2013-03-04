var GameScreenHandler = (function () {
    function GameScreenHandler(gameServer) {
        var _this = this;
        var completionCallback = function (nextScreen, fromScreen) {
            _this.screenDone(nextScreen, fromScreen);
        };
        this._screens = {
        };
        this._screens[Loading.NAME] = new Loading(completionCallback, gameServer);
        this._screens[MainMenu.NAME] = new MainMenu(completionCallback, gameServer);
        this._screens[QuickMatch.NAME] = new QuickMatch(completionCallback, gameServer);
        this._screens[Options.NAME] = new Options(completionCallback, gameServer);
        this._screens[Settings.NAME] = new Settings(completionCallback, gameServer);
        this._screens[FindGame.NAME] = new FindGame(completionCallback, gameServer);
        this._screens[CreateGame.NAME] = new CreateGame(completionCallback, gameServer);
        this._screens[Preloader.NAME] = new Preloader(completionCallback, gameServer);
        this._screens[MainGame.NAME] = new MainGame(completionCallback, gameServer);
    }
    GameScreenHandler.prototype.screenDone = function (nextScreen, fromScreen) {
        this.Load(nextScreen, fromScreen);
    };
    GameScreenHandler.prototype.Load = function (gameScreen, oldScreen) {
        this._currentScreen = this._screens[gameScreen];
        this._currentScreen.Load(oldScreen);
    };
    return GameScreenHandler;
})();
//@ sourceMappingURL=GameScreenHandler.js.map
