var GameLoop = (function () {
    function GameLoop(_update, _draw, _proxy) {
        this._update = _update;
        this._draw = _draw;
        this._proxy = _proxy;
        this._gameTime = new GameTime();
    }
    GameLoop.prototype.loop = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.loop();
        });
        this._gameTime.Update();
        this._update.call(this._proxy, this._gameTime);
        this._draw.call(this._proxy);
    };
    GameLoop.prototype.Start = function () {
        this.loop();
    };
    return GameLoop;
})();
