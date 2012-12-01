var CoreRenderer = (function () {
    function CoreRenderer(_scene) {
        this._scene = _scene;
    }
    CoreRenderer.prototype.determineRenderer = function () {
        if(THREE.Detector.webgl) {
            return new THREE.WebGLRenderer({
                preserveDrawingBuffer: true
            });
        } else {
            if(THREE.Detector.canvas) {
                return new THREE.CanvasRenderer();
            } else {
                alert("Your browser does not support 3D techniques.  Please try again in a newer browser.");
            }
        }
    };
    CoreRenderer.prototype.Initialize = function () {
        this._renderer = this.determineRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        $("#GameWrapper").append(this._renderer.domElement);
        return this._renderer;
    };
    CoreRenderer.prototype.Draw = function (camera) {
        this._renderer.render(this._scene, camera.Context);
    };
    return CoreRenderer;
})();
//@ sourceMappingURL=CoreRenderer.js.map
