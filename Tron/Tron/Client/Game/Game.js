var Game = (function () {
    function Game() {
        this._camera = new Camera();
        this._gameRenderer = new GameRenderer(this._camera);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameLoop.Start();
    }
    Game.prototype.Draw = function () {
        this._gameRenderer.Draw();
    };
    Game.prototype.Update = function (gameTime) {
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
