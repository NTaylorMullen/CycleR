var Game = (function () {
    function Game(gameServer) {
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameHandler = new GameHandler(gameServer, this._camera);
        this._gameLoop.Start();
    }
    Game.prototype.Start = function (initialPayload) {
        this._gameHandler.Initialize(PayloadConverter.CreateAllCycles(initialPayload.Cycles));
        this._gameLoop.Start();
    };
    Game.prototype.Draw = function () {
        this._gameRenderer.Draw(this._camera);
        this._gameRenderer.AddAll(this._gameHandler.GetPendingObjects());
    };
    Game.prototype.ServerMovementPayload = function (payload) {
        this._gameHandler.ServerMovementPayload(payload);
    };
    Game.prototype.ServerDeathPayload = function (payload) {
        this._gameRenderer.Remove(this._gameHandler.ServerDeathPayload(payload).Context);
    };
    Game.prototype.Update = function (gameTime) {
        this._gameHandler.Update(gameTime);
        this._camera.Update(gameTime);
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
