var Camera = (function () {
    function Camera(_renderer) {
        this._renderer = _renderer;
        this.initializeGameCamera();
        this.Mode = FreeCameraController.MODE;
        this.initializeCameraControllers();
    }
    Camera.DISTANCE = 1000;
    Camera.prototype.initializeGameCamera = function () {
        this.Context = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.Context.position.z = Camera.DISTANCE;
        THREEx.WindowResize(this._renderer, this.Context);
    };
    Camera.prototype.initializeCameraControllers = function () {
        this._controllers = {
            Free: new FreeCameraController(this.Context, this._renderer),
            Attached: new AttachedCameraController(this.Context, this._renderer)
        };
    };
    Camera.prototype.Update = function (gameTime) {
        this._controllers[this.Mode].Update(gameTime);
    };
    return Camera;
})();
