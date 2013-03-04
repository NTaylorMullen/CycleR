var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuickMatch = (function (_super) {
    __extends(QuickMatch, _super);
    function QuickMatch(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, QuickMatch.NAME, onCompletion, gameServer);
        this._menu = new Menu("Quick Match", [
            new MenuOption("Cancel", function () {
                _this.Done();
            })
        ]);
    }
    QuickMatch.NAME = "QuickMatch";
    QuickMatch.prototype.Done = function (nextScreen) {
        this._menu.Stop();
        _super.prototype.Done.call(this, nextScreen);
    };
    QuickMatch.prototype.Load = function (lastScreen) {
        _super.prototype.Load.call(this, lastScreen);
        this._menu.Start();
    };
    return QuickMatch;
})(GameScreen);
//@ sourceMappingURL=QuickMatch.js.map
