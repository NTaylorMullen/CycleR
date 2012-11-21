var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FreeCameraController = (function (_super) {
    __extends(FreeCameraController, _super);
    function FreeCameraController(camera, renderer) {
        _super.call(this, camera, renderer);
        this.initializeCamera(camera);
    }
    FreeCameraController.MODE = "Free";
    FreeCameraController.MOVE_SPEED = 1000;
    FreeCameraController.LOOK_SPEED = 0.075;
    FreeCameraController.prototype.initializeCamera = function (camera) {
        this._controls = new THREE.FirstPersonControls(camera);
        this._controls.movementSpeed = FreeCameraController.MOVE_SPEED;
        this._controls.lookSpeed = FreeCameraController.LOOK_SPEED;
    };
    FreeCameraController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        this._controls.update(gameTime.FractionOfSecond);
    };
    return FreeCameraController;
})(CameraController);
