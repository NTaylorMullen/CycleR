/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class CreateGame extends GameScreen {
    static NAME: string = "CreateGame";

    private _menu: Menu;

    constructor(onCompletion: Function, gameServer: IHubProxy) {
        super(FindGame.NAME, onCompletion, gameServer);

        this._menu = new Menu("Create Game", [
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