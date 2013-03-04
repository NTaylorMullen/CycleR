var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CreateGame = (function (_super) {
    __extends(CreateGame, _super);
    function CreateGame(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, FindGame.NAME, onCompletion, gameServer);
        this._menu = new Menu("Create Game", [
            new MenuOption("Cancel", function () {
                _this.Done();
            })
        ]);
    }
    CreateGame.NAME = "CreateGame";
    CreateGame.prototype.Done = function (nextScreen) {
        this._menu.Stop();
        _super.prototype.Done.call(this, nextScreen);
    };
    CreateGame.prototype.Load = function (lastScreen) {
        _super.prototype.Load.call(this, lastScreen);
        this._menu.Start();
    };
    return CreateGame;
})(GameScreen);
//@ sourceMappingURL=CreateGame.js.map
