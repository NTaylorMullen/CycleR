/// <reference path="GameLoop.ts" />
/// <reference path="../Renderers/GameRenderer.ts" />
/// <reference path="../ModelHelpers/ModelLibrary.ts" />
/// <reference path="../ModelHelpers/ModelLoader.ts" />
/// <reference path="../View/Camera.ts" />

class Game {
    private _modelLoader: ModelLoader;
    private _gameRenderer: GameRenderer;
    private _gameLoop: GameLoop;
    private _camera: Camera;

    constructor () {
        this._modelLoader = new ModelLoader();
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);

        this.load();
        this._gameLoop.Start();
    }

    private load(): void {
        this._modelLoader.LoadModel(ModelLibrary.Cycle);
    }
    
    public Draw(): void {
        this._gameRenderer.Draw(this._camera);
    }

    public Update(gameTime: GameTime): void {
        this._camera.Update(gameTime);
    }
}