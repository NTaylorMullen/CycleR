var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(onCompletion, gameServer) {
        _super.call(this, Loading.NAME, onCompletion, gameServer);
        this.GameServer.client.configure = this.configureGame;
    }
    Loading.NAME = "Loading";
    Loading.prototype.configureGame = function (configuration) {
    };
    return Loading;
})(GameScreen);
//@ sourceMappingURL=Loading.js.map
