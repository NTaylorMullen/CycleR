var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FindGame = (function (_super) {
    __extends(FindGame, _super);
    function FindGame(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, FindGame.NAME, onCompletion, gameServer);
        this._menu = new Menu("Find Game", [
            new MenuOption("Cancel", function () {
                _this.Done();
            })
        ]);
    }
    FindGame.NAME = "FindGame";
    FindGame.prototype.Done = function (nextScreen) {
        this._menu.Stop();
        _super.prototype.Done.call(this, nextScreen);
    };
    FindGame.prototype.Load = function (lastScreen) {
        _super.prototype.Load.call(this, lastScreen);
        this._menu.Start();
        console.log("Find Game loaded!");
        console.log("Loading 'loading' screen...");
    };
    return FindGame;
})(GameScreen);
//@ sourceMappingURL=FindGame.js.map
