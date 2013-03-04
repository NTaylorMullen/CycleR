var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, MainMenu.NAME, onCompletion, gameServer);
        this._menu = new Menu("Main Menu", [
            new MenuOption("Quick Match", function () {
                _this.Done(QuickMatch.NAME);
            }), 
            new MenuOption("Find Game", function () {
                _this.Done(FindGame.NAME);
            }), 
            new MenuOption("Create Game", function () {
                _this.Done(CreateGame.NAME);
            }), 
            new MenuOption("Settings", function () {
                _this.Done(Settings.NAME);
            })
        ]);
    }
    MainMenu.NAME = "MainMenu";
    MainMenu.prototype.Done = function (nextScreen) {
        this._menu.Stop();
        _super.prototype.Done.call(this, nextScreen);
    };
    MainMenu.prototype.Load = function () {
        console.log("Main Menu loaded!");
        console.log("Loading 'Find Game'...");
        this._menu.Start();
    };
    return MainMenu;
})(GameScreen);
//@ sourceMappingURL=MainMenu.js.map
