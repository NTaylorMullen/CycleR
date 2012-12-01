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
//@ sourceMappingURL=MainMenu.js.map
