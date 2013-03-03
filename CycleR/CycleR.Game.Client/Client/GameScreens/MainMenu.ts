/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />
/// <reference path="Components/Menu.ts" />
/// <reference path="Components/MenuOption.ts" />

class MainMenu extends GameScreen {
    static NAME: string = "MainMenu";

    private _menu: Menu;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(MainMenu.NAME, onCompletion, gameServer);

        this._menu = new Menu("Main Menu", [
                                            new MenuOption("Quick Match", () => { alert("quick game"); }),
                                            new MenuOption("Find Game", () => { alert("find game"); }),
                                            new MenuOption("Create Game", () => { alert("create game"); }),
                                            new MenuOption("Options", () => { alert("options"); })
                                           ]);
    }

    public Load(): void {
        console.log("Main Menu loaded!");
        console.log("Loading 'Find Game'...");

        this._menu.Start();
        // super.Done(FindGame.NAME);
    }
}