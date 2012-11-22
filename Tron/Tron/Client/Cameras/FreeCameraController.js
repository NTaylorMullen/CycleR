var CameraController = (function () {
    function CameraController(_camera, renderer) {
        this._camera = _camera;
        this.applyKeyboardMappings();
    }
    CameraController.prototype.applyKeyboardMappings = function () {
    };
    CameraController.prototype.Update = function (gameTime) {
    };
    return CameraController;
})();
var GameTime = (function () {
    function GameTime() {
        this.StartedAt = new Date();
        this.Now = this.LastUpdated = this.StartedAt;
        this.ElapsedGameTime = 0;
        this.FPS = 0;
        this.FractionOfSecond = 0;
    }
    GameTime.prototype.TotalGameTime = function () {
        return this.Now.getTime() - this.StartedAt.getTime();
    };
    GameTime.prototype.Update = function () {
        this.LastUpdated = this.Now;
        this.Now = new Date();
        this.ElapsedGameTime = this.Now.getTime() - this.LastUpdated.getTime();
        this.FPS = 1000 / this.ElapsedGameTime;
        this.FractionOfSecond = this.ElapsedGameTime / 1000;
    };
    return GameTime;
})();
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
