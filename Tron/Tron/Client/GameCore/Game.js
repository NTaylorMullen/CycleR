var Game = (function () {
    function Game() {
        this._modelLoader = new ModelLoader();
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameHandler = new GameHandler(this._camera);
        this.load();
        this._gameLoop.Start();
    }
    Game.prototype.load = function () {
        var _this = this;
        this._modelLoader.LoadModel(ModelLibrary.Cycle, function () {
            _this._gameHandler.ModelsLoaded(_this._modelLoader.GetModels());
        });
    };
    Game.prototype.Draw = function () {
        this._gameRenderer.Draw(this._camera);
        this._gameRenderer.AddAll(this._gameHandler.GetPendingObjects());
    };
    Game.prototype.Update = function (gameTime) {
        this._gameHandler.Update(gameTime);
        this._camera.Update(gameTime);
    };
    return Game;
})();
