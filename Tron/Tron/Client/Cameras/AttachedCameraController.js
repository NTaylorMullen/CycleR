var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var AttachedCameraController = (function (_super) {
    __extends(AttachedCameraController, _super);
    function AttachedCameraController(_camera, renderer) {
        var _this = this;
        _super.call(this, _camera, renderer);
        this._camera = _camera;
        this._theta = 0;
        this._cameraInverted = true;
        this._attachedTo = null;
        this._readMouse = false;
        this._mouseStart = new THREE.Vector2();
        this._thetaIncrementor = 0;
        document.addEventListener('mousemove', function (event) {
            _this.onMouseMove(event);
        }, false);
        document.addEventListener('mousedown', function (event) {
            _this.onMouseDown(event);
        }, false);
        document.addEventListener('mouseup', function (event) {
            _this.onMouseUp(event);
        }, false);
        this.applyKeyboardBindings();
    }
    AttachedCameraController.MODE = "Attached";
    AttachedCameraController.INTERPOLATE_THRESHOLD = 30;
    AttachedCameraController.CAMERA_SENSITIVITY = 300;
    AttachedCameraController.CAMERA_SPEED = 4;
    AttachedCameraController.CAMERA_HEIGHT = 300;
    AttachedCameraController.CAMERA_DISTANCE = 500;
    AttachedCameraController.TO_RADIANS = Math.PI / 360;
    AttachedCameraController.prototype.onMouseMove = function (event) {
        event.preventDefault();
        if(this._readMouse) {
            var thetaInverter = -1;
            var thetaDirection = (this._mouseStart.x - event.clientX);

            if(thetaDirection !== 0) {
                thetaDirection /= Math.abs(thetaDirection);
            }
            if(!this._cameraInverted) {
                thetaInverter *= -1;
            }
            this._thetaIncrementor = (thetaDirection * thetaInverter * (Math.min(Math.abs((this._mouseStart.x - event.clientX) / AttachedCameraController.CAMERA_SENSITIVITY), 1))) * AttachedCameraController.CAMERA_SPEED;
        }
    };
    AttachedCameraController.prototype.onMouseDown = function (event) {
        event.preventDefault();
        this._mouseStart.x = event.clientX;
        this._mouseStart.y = event.clientY;
        this._readMouse = true;
    };
    AttachedCameraController.prototype.onMouseUp = function (event) {
        event.preventDefault();
        this._readMouse = false;
        this._thetaIncrementor = 0;
    };
    AttachedCameraController.prototype.tweenThetaOffsetBy = function (offset) {
        if(!this._readMouse) {
            this._theta = (this._attachedTo.rotation.y / AttachedCameraController.TO_RADIANS) + offset;
        }
    };
    AttachedCameraController.prototype.applyKeyboardBindings = function () {
        var _this = this;
        shortcut.add("1", function () {
            _this.tweenThetaOffsetBy(-90);
        });
        shortcut.add("2", function () {
            _this.tweenThetaOffsetBy(90);
        });
        shortcut.add("3", function () {
            _this.tweenThetaOffsetBy(-270);
        });
        shortcut.add("4", function () {
            _this.tweenThetaOffsetBy(270);
        });
    };
    AttachedCameraController.prototype.getAttachedPosition = function () {
        var position = this._lastAttachedPosition.clone();
        var xDiff = this._attachedTo.position.x - this._lastAttachedPosition.x;
        var zDiff = this._attachedTo.position.z - this._lastAttachedPosition.z;

        if(Math.abs(xDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.x += (xDiff / Math.abs(xDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        } else {
            position.x = this._attachedTo.position.x;
        }
        if(Math.abs(zDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.z += (zDiff / Math.abs(zDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        } else {
            position.z = this._attachedTo.position.z;
        }
        return position;
    };
    AttachedCameraController.prototype.AttachTo = function (object) {
        if(this._attachedTo === null) {
            this._attachedTo = object;
            this._lastAttachedPosition = object.position.clone();
            this._camera.lookAt(object.position);
            this._camera.position.y = AttachedCameraController.CAMERA_HEIGHT;
        } else {
            throw new Error("Camera is already attached to an object.");
        }
    };
    AttachedCameraController.prototype.Detach = function () {
        if(this._attachedTo !== null) {
            this._attachedTo = null;
        } else {
            throw new Error("Camera is not attached to an objects.");
        }
    };
    AttachedCameraController.prototype.Update = function (gameTime) {
        _super.prototype.Update.call(this, gameTime);
        if(this._attachedTo != null) {
            if(this._readMouse) {
                this._theta += this._thetaIncrementor;
            }
            var position = this.getAttachedPosition();
            this._camera.position.x = position.x + AttachedCameraController.CAMERA_DISTANCE * Math.sin(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.position.z = position.z + AttachedCameraController.CAMERA_DISTANCE * Math.cos(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.lookAt(this._attachedTo.position);
            this._lastAttachedPosition = position;
        }
    };
    return AttachedCameraController;
})(CameraController);
//@ sourceMappingURL=AttachedCameraController.js.map
