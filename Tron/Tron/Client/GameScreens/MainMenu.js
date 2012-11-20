var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(onCompletion, gameHub) {
        _super.call(this, MainMenu.NAME, onCompletion, gameHub);
    }
    MainMenu.NAME = "MainMenu";
    return MainMenu;
})(GameScreen);
