/// <reference path="../Interfaces/TweenJS/Tweenjs.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="GameTime.ts" />

class GameLoop {
    private _gameTime: GameTime;

    constructor (private _update: Function, private _draw: Function, private _proxy: Game) {
        this._gameTime = new GameTime();        
    }

    private loop(): void {
        requestAnimationFrame(() => this.loop());

        this._gameTime.Update();

        this._update.call(this._proxy, this._gameTime);
        this._draw.call(this._proxy);

        TWEEN.update();
    }

    public Start(): void {
        this.loop();
    }
}