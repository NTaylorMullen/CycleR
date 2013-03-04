/// <reference path="Loading.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="QuickMatch.ts" />
/// <reference path="Options.ts" />
/// <reference path="Settings.ts" />
/// <reference path="FindGame.ts" />
/// <reference path="CreateGame.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="MainGame.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="Components/Menu.ts" />
/// <reference path="Components/MenuOption.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class GameScreenHandler {
    private _screens: { [s: string]: GameScreen; };
    private _currentScreen: GameScreen;

    constructor (gameServer: IHubProxy) {
        var completionCallback = (nextScreen: string, fromScreen: string) => {
            this.screenDone(nextScreen, fromScreen);
        };

        this._screens = {};
        this._screens[Loading.NAME] = new Loading(completionCallback, gameServer);
        this._screens[MainMenu.NAME] = new MainMenu(completionCallback, gameServer);
        this._screens[QuickMatch.NAME] = new QuickMatch(completionCallback, gameServer);
        this._screens[Options.NAME] = new Options(completionCallback, gameServer);
        this._screens[Settings.NAME] = new Settings(completionCallback, gameServer);
        this._screens[FindGame.NAME] = new FindGame(completionCallback, gameServer);
        this._screens[CreateGame.NAME] = new CreateGame(completionCallback, gameServer);
        this._screens[Preloader.NAME] = new Preloader(completionCallback, gameServer);
        this._screens[MainGame.NAME] = new MainGame(completionCallback, gameServer);
    }

    private screenDone(nextScreen: string, fromScreen: string): void {
        this.Load(nextScreen, fromScreen);
    }

    public Load(gameScreen: string, oldScreen?: string): void {
        this._currentScreen = this._screens[gameScreen];
        this._currentScreen.Load(oldScreen);
    }    
}