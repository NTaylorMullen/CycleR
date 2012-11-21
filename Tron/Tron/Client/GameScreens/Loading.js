var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(onCompletion, gameHub) {
        _super.call(this, Loading.NAME, onCompletion, gameHub);
    }
    Loading.NAME = "Loading";
    return Loading;
})(GameScreen);
