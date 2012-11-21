var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Options = (function (_super) {
    __extends(Options, _super);
    function Options(onCompletion, gameHub) {
        _super.call(this, Options.NAME, onCompletion, gameHub);
    }
    Options.NAME = "Options";
    return Options;
})(GameScreen);
