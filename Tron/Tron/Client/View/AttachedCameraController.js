var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var AttachedCameraController = (function (_super) {
    __extends(AttachedCameraController, _super);
    function AttachedCameraController(camera, renderer) {
        _super.call(this, camera, renderer);
    }
    AttachedCameraController.MODE = "Attached";
    return AttachedCameraController;
})(CameraController);
