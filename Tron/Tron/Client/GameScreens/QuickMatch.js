var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuickMatch = (function (_super) {
    __extends(QuickMatch, _super);
    function QuickMatch(onCompletion, gameServer) {
        _super.call(this, QuickMatch.NAME, onCompletion, gameServer);
    }
    QuickMatch.NAME = "QuickMatch";
    return QuickMatch;
})(GameScreen);
//@ sourceMappingURL=QuickMatch.js.map
