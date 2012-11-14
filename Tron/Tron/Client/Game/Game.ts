/// <reference path="GameLoop.ts" />
/// <reference path="../Renderers/GameRenderer.ts" />
/// <reference path="../View/Camera.ts" />

class Game {
    private _gameRenderer: GameRenderer;
    private _gameLoop: GameLoop;
    private _camera: Camera;

    constructor () {
        this._camera = new Camera();
        this._gameRenderer = new GameRenderer(this._camera);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameLoop.Start();
    }

    private Draw(): void {
        this._gameRenderer.Draw();
    }

    private Update(gameTime: GameTime): void {
    }
}