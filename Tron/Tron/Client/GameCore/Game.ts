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

    constructor (gameServer: IHubProxy) {
        this._gameRenderer = new GameRenderer();
        this._camera = new Camera(this._gameRenderer.Renderer);
        this._gameLoop = new GameLoop(this.Update, this.Draw, this);
        this._gameHandler = new GameHandler(gameServer, this._camera);

        this._gameLoop.Start();
    }    

    public Start(initialPayload: IInitializationPayloadDecompressed): void {
        this._gameHandler.Initialize(PayloadConverter.CreateAllCycles(initialPayload.Cycles));

        this._gameLoop.Start();
    }

    public Draw(): void {
        this._gameRenderer.Draw(this._camera);
        this._gameRenderer.AddAll(this._gameHandler.GetPendingObjects());
    }

    public ServerMovementPayload(payload: IMovementPayloadDecompressed): void {
        this._gameHandler.ServerMovementPayload(payload);
    }

    public ServerDeathPayload(payload: IDeathPayloadDecompressed): void {
        this._gameRenderer.Remove(this._gameHandler.ServerDeathPayload(payload).Context);
    }

    public ServerCollisionPayload(payload: ICollisionPayloadDecompressed): void {
        this._gameHandler.ServerCollisionPayload(payload);
    }

    public Update(gameTime: GameTime): void {
        this._gameHandler.Update(gameTime);
        this._camera.Update(gameTime);        
    }
}