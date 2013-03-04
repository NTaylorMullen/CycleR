/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class Settings extends GameScreen {
    static NAME: string = "Options";

    private _menu: Menu;

    constructor(onCompletion: Function, gameServer: IHubProxy) {
        super(FindGame.NAME, onCompletion, gameServer);

        this._menu = new Menu("Settings", [
                                                new MenuOption("Cancel", () => { this.Done(); })
                                          ]);
    }

    public Done(nextScreen?: string): void {
        this._menu.Stop();
        super.Done(nextScreen);
    }

    public Load(lastScreen?: string): void {
        super.Load(lastScreen);
        this._menu.Start();
    }
}