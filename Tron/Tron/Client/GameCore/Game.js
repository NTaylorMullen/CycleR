var Game = (function () {
    function Game() {
        this._modelLoader = new ModelLoader();
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this.load();
        this._gameLoop.Start();
    }
    Game.prototype.load = function () {
        this._modelLoader.LoadModel(ModelLibrary.Cycle);
    };
    Game.prototype.Draw = function () {
        this._gameRenderer.Draw(this._camera);
    };
    Game.prototype.Update = function (gameTime) {
        this._camera.Update(gameTime);
    };
    return Game;
})();
