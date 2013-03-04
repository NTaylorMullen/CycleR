/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class MainMenu extends GameScreen {
    static NAME: string = "MainMenu";

    private _menu: Menu;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(MainMenu.NAME, onCompletion, gameServer);

        this._menu = new Menu("Main Menu", [
                                            new MenuOption("Quick Match", () => { this.Done(QuickMatch.NAME); }),
                                            new MenuOption("Find Game", () => { this.Done(FindGame.NAME); }),
                                            new MenuOption("Create Game", () => { this.Done(CreateGame.NAME); }),
                                            new MenuOption("Settings", () => { this.Done(Settings.NAME); })
                                           ]);
    }

    public Done(nextScreen?: string) {
        this._menu.Stop();
        super.Done(nextScreen);
    }

    public Load(lastScreen?: string): void {
        super.Load(lastScreen);
        console.log("Main Menu loaded!");
        console.log("Loading 'Find Game'...");

        this._menu.Start();
    }
}