/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class FindGame extends GameScreen {
    static NAME: string = "FindGame";

    private _menu: Menu;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(FindGame.NAME, onCompletion, gameServer);

        this._menu = new Menu("Find Game", [
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

        console.log("Find Game loaded!");
        console.log("Loading 'loading' screen...");
        //super.Done(Loading.NAME);
    }
}