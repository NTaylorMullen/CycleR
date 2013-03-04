var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings(onCompletion, gameServer) {
        _super.call(this, Settings.NAME, onCompletion, gameServer);
    }
    Settings.NAME = "Options";
    return Settings;
})(GameScreen);
//@ sourceMappingURL=Settings.js.map
