var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(onCompletion, gameServer) {
        _super.call(this, MainMenu.NAME, onCompletion, gameServer);
        this._menu = new Menu("Main Menu", [
            new MenuOption("Quick Match", function () {
                alert("quick game");
            }), 
            new MenuOption("Find Game", function () {
                alert("find game");
            }), 
            new MenuOption("Create Game", function () {
                alert("create game");
            }), 
            new MenuOption("Options", function () {
                alert("options");
            })
        ]);
    }
    MainMenu.NAME = "MainMenu";
    MainMenu.prototype.Load = function () {
        console.log("Main Menu loaded!");
        console.log("Loading 'Find Game'...");
        this._menu.Start();
    };
    return MainMenu;
})(GameScreen);
//@ sourceMappingURL=MainMenu.js.map
