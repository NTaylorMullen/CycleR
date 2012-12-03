/// <reference path="GameLoop.ts" />
/// <reference path="GameHandler.ts" />
/// <reference path="../PayloadManagement/PayloadConverter.ts" />
/// <reference path="../Renderers/GameRenderer.ts" />
/// <reference path="../ModelHelpers/ModelLibrary.ts" />
/// <reference path="../ModelHelpers/ModelLoader.ts" />
/// <reference path="../Cameras/Camera.ts" />

class Game {
    private _gameRenderer: GameRenderer;
    private _gameLoop: GameLoop;
    private _gameHandler: GameHandler;
    private _camera: Camera;

    constructor (gameHub: IHubProxy) {
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameHandler = new GameHandler(gameHub, this._camera, ModelLoader.GetModels());

        this._gameLoop.Start();
    }

    public Start(initialPayload: IPayloadDecompressed): void {
        this._gameHandler.Initialize(PayloadConverter.CreateAllCycles(initialPayload.Cycles));

        this._gameLoop.Start();
    }

    public Draw(): void {
        this._gameRenderer.Draw(this._camera);
        this._gameRenderer.AddAll(this._gameHandler.GetPendingObjects());
    }

    public Update(gameTime: GameTime): void {
        this._gameHandler.Update(gameTime);
        this._camera.Update(gameTime);        
    }
}