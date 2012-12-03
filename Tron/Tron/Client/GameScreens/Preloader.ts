/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../PayloadManagement/PayloadConverter.ts" />
/// <reference path="../ModelHelpers/ModelLoader.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class Preloader extends GameScreen {
    static NAME: string = "Preloader";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(Preloader.NAME, onCompletion, gameServer);
    }

    private modelsLoaded(): void {
        PayloadConverter.InitializeModels(ModelLoader.GetModels());
        super.Done(MainMenu.NAME);
    }

    public Load(): void {
        ModelLoader.LoadModel(ModelLibrary.Cycle, () => {
            this.modelsLoaded();
        });        
    }
}