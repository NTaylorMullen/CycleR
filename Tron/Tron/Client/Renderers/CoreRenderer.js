var CoreRenderer = (function () {
    function CoreRenderer(_scene, _camera) {
        this._scene = _scene;
        this._camera = _camera;
        this.initializeRenderer();
    }
    CoreRenderer.prototype.initializeRenderer = function () {
        this._renderer = this.determineRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        $("body").append(this._renderer.domElement);
    };
    CoreRenderer.prototype.determineRenderer = function () {
        if(THREE.Detector.webgl) {
            return new THREE.WebGLRenderer();
        } else {
            if(THREE.Detector.canvas) {
                return new THREE.CanvasRenderer();
            } else {
                alert("Your browser does not support 3D techniques.  Please try again in a newer browser.");
            }
        }
    };
    CoreRenderer.prototype.Draw = function () {
        this._renderer.render(this._scene, this._camera.Context);
    };
    return CoreRenderer;
})();
//@ sourceMappingURL=CoreRenderer.js.map
