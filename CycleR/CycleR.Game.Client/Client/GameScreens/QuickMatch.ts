/// <reference path="GameScreen.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class QuickMatch extends GameScreen {
    static NAME: string = "QuickMatch";

    private _menu: Menu;

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(QuickMatch.NAME, onCompletion, gameServer);

        this._menu = new Menu("Quick Match", [
                                                new MenuOption("Cancel", () => { this.Done(); })
                                             ]);
    }

    public Done(nextScreen?: string) {
        this._menu.Stop();
        super.Done(nextScreen);
    }

    public Load(lastScreen?: string): void {
        super.Load(lastScreen);
        this._menu.Start();
    }
}