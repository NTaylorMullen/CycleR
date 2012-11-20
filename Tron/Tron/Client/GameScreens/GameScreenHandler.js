var GameScreenHandler = (function () {
    function GameScreenHandler(gameHub) {
        var _this = this;
        var completionCallback = function (nextScreen) {
            _this.screenDone(nextScreen);
        };
        this._screens = {
        };
        this._screens[Loading.NAME] = new Loading(completionCallback, gameHub);
        this._screens[MainMenu.NAME] = new MainMenu(completionCallback, gameHub);
        this._screens[QuickMatch.NAME] = new QuickMatch(completionCallback, gameHub);
        this._screens[Options.NAME] = new Options(completionCallback, gameHub);
        this._screens[FindGame.NAME] = new FindGame(completionCallback, gameHub);
        this._screens[CreateGame.NAME] = new CreateGame(completionCallback, gameHub);
        this._screens[MainGame.NAME] = new MainGame(completionCallback, gameHub);
    }
    GameScreenHandler.prototype.screenDone = function (nextScreen) {
        this.Load(nextScreen);
    };
    GameScreenHandler.prototype.Load = function (gameScreen) {
        this._currentScreen = this._screens[gameScreen];
        this._currentScreen.Load();
    };
    return GameScreenHandler;
})();
