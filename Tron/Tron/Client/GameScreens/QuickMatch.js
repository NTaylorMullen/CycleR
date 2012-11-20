var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var QuickMatch = (function (_super) {
    __extends(QuickMatch, _super);
    function QuickMatch(onCompletion, gameHub) {
        _super.call(this, QuickMatch.NAME, onCompletion, gameHub);
    }
    QuickMatch.NAME = "QuickMatch";
    return QuickMatch;
})(GameScreen);
