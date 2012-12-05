var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader(onCompletion, gameServer) {
        _super.call(this, Preloader.NAME, onCompletion, gameServer);
    }
    Preloader.NAME = "Preloader";
    Preloader.prototype.modelsLoaded = function () {
        console.log("Models loaded!");
        PayloadConverter.InitializeModels(ModelLoader.GetModels());
        console.log("Loading Main Menu...");
        _super.prototype.Done.call(this, MainMenu.NAME);
    };
    Preloader.prototype.Load = function () {
        var _this = this;
        console.log("Preloader loaded!");
        console.log("Loading models...");
        ModelLoader.LoadModel(ModelLibrary.Cycle, function () {
            _this.modelsLoaded();
        });
    };
    return Preloader;
})(GameScreen);
//@ sourceMappingURL=Preloader.js.map
