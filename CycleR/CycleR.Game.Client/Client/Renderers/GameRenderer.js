var GameRenderer = (function () {
    function GameRenderer() {
        this._scene = new THREE.Scene();
        this._environmentRenderer = new EnvironmentRenderer(this._scene);
        this._mapRenderer = new MapRenderer(this._scene);
        this._coreRenderer = new CoreRenderer(this._scene);
        this.Renderer = this._coreRenderer.Initialize();
    }
    GameRenderer.prototype.Add = function (object) {
        this._scene.add(object);
    };
    GameRenderer.prototype.AddAll = function (objects) {
        for(var i = 0; i < objects.length; i++) {
            this._scene.add(objects[i]);
        }
    };
    GameRenderer.prototype.Remove = function (object) {
        this._scene.remove(object);
    };
    GameRenderer.prototype.Draw = function (camera) {
        this._coreRenderer.Draw(camera);
    };
    return GameRenderer;
})();
//@ sourceMappingURL=GameRenderer.js.map
