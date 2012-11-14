var GameRenderer = (function () {
    function GameRenderer(gameCamera) {
        this._scene = new THREE.Scene();
        this._environmentRenderer = new EnvironmentRenderer(this._scene);
        this._mapRenderer = new MapRenderer(this._scene);
        this._coreRenderer = new CoreRenderer(this._scene, gameCamera);
    }
    GameRenderer.prototype.Add = function (object) {
        this._scene.add(object);
    };
    GameRenderer.prototype.Draw = function () {
        this._coreRenderer.Draw();
    };
    return GameRenderer;
})();
//@ sourceMappingURL=GameRenderer.js.map
