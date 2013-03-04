var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, FindGame.NAME, onCompletion, gameServer);
        this._menu = new Menu("Settings", [
            new MenuOption("Cancel", function () {
                _this.Done();
            })
        ]);
    }
    Settings.NAME = "Options";
    Settings.prototype.Done = function (nextScreen) {
        this._menu.Stop();
        _super.prototype.Done.call(this, nextScreen);
    };
    Settings.prototype.Load = function (lastScreen) {
        _super.prototype.Load.call(this, lastScreen);
        this._menu.Start();
    };
    return Settings;
})(GameScreen);
//@ sourceMappingURL=Settings.js.map
