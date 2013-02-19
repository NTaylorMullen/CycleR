/// <reference path="CameraController.ts" />
/// <reference path="../GameCore/Game.ts" />

class AttachedCameraController extends CameraController {
    static MODE: string = "Attached";
    static INTERPOLATE_THRESHOLD: number = 30;
    static CAMERA_SENSITIVITY: number = 300;
    static CAMERA_SPEED: number = 4;
    static CAMERA_HEIGHT: number = 300;
    static CAMERA_DISTANCE: number = 500;
    static TO_RADIANS: number = Math.PI / 360;

    private _attachedTo: IMesh;
    private _lastAttachedPosition: IVector3;

    private _thetaIncrementor: number;
    private _mouseStart: IVector2;
    private _readMouse: bool;
    private _theta: number = 0;
    private _cameraInverted: bool = true;

    constructor (private _camera: ICamera, renderer: IRenderer) {
        super(_camera, renderer);

        this._attachedTo = null;
        this._readMouse = false;
        this._mouseStart = new THREE.Vector2();
        this._thetaIncrementor = 0;

        document.addEventListener('mousemove', (event: MouseEvent) => {
            this.onMouseMove(event);
        }, false);
        document.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(event);
        }, false);
        document.addEventListener('mouseup', (event: MouseEvent) => {
            this.onMouseUp(event);
        }, false);

        this.applyKeyboardBindings();
    }

    private onMouseMove(event: MouseEvent): void {
        event.preventDefault();

        if (this._readMouse) {
            var thetaInverter = -1,
            thetaDirection: number = (this._mouseStart.x - event.clientX);

            if (thetaDirection !== 0) {
                thetaDirection /= Math.abs(thetaDirection);
            }

            if (!this._cameraInverted) {
                thetaInverter *= -1;
            }

            this._thetaIncrementor = (thetaDirection * thetaInverter * (Math.min(Math.abs((this._mouseStart.x - event.clientX) / AttachedCameraController.CAMERA_SENSITIVITY), 1))) * AttachedCameraController.CAMERA_SPEED;
        }
    }

    private onMouseDown(event: MouseEvent): void {
        event.preventDefault();

        this._mouseStart.x = event.clientX;
        this._mouseStart.y = event.clientY;
        this._readMouse = true;
    }

    private onMouseUp(event: MouseEvent): void {
        event.preventDefault();

        this._readMouse = false;
        this._thetaIncrementor = 0;
    }

    private tweenThetaOffsetBy(offset: number): void {
        if (!this._readMouse) {
            this._theta = (this._attachedTo.rotation.y / AttachedCameraController.TO_RADIANS) + offset;
        }
    }

    private applyKeyboardBindings(): void {
        shortcut.add("1", () => {
            this.tweenThetaOffsetBy(-90);
        });

        shortcut.add("2", () => {
            this.tweenThetaOffsetBy(90);
        });

        shortcut.add("3", () => {
            this.tweenThetaOffsetBy(-270);
        });

        shortcut.add("4", () => {
            this.tweenThetaOffsetBy(270);
        });
    }

    private getAttachedPosition(): IVector3 {
        var position: IVector3 = this._lastAttachedPosition.clone(),
            xDiff: number = this._attachedTo.position.x - this._lastAttachedPosition.x,
            zDiff: number = this._attachedTo.position.z - this._lastAttachedPosition.z;

        if (Math.abs(xDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.x += (xDiff / Math.abs(xDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        }
        else {
            position.x = this._attachedTo.position.x;
        }

        if (Math.abs(zDiff) > AttachedCameraController.INTERPOLATE_THRESHOLD) {
            position.z += (zDiff / Math.abs(zDiff)) * AttachedCameraController.INTERPOLATE_THRESHOLD;
        }
        else {
            position.z = this._attachedTo.position.z;
        }

        return position;
    }

    public AttachTo(object: IMesh): void {
        if (this._attachedTo === null) {
            this._attachedTo = object;
            this._lastAttachedPosition = object.position.clone();
            this._camera.lookAt(object.position);
            this._camera.position.y = AttachedCameraController.CAMERA_HEIGHT;
        }
        else {
            throw new Error("Camera is already attached to an object.");
        }
    }

    public Detach(): void {
        if (this._attachedTo !== null) {
            this._attachedTo = null;
            this._lastAttachedPosition = null;
        }
        else {
            throw new Error("Camera is not attached to an objects.");
        }
    }

    public Update(gameTime: GameTime): void {
        super.Update(gameTime);

        if (this._attachedTo != null) {          
            if (this._readMouse) {
                this._theta += this._thetaIncrementor;
            }

            var position: IVector3 = this.getAttachedPosition();
            this._camera.position.x = position.x + AttachedCameraController.CAMERA_DISTANCE * Math.sin(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.position.z = position.z + AttachedCameraController.CAMERA_DISTANCE * Math.cos(this._theta * AttachedCameraController.TO_RADIANS);
            this._camera.lookAt(this._attachedTo.position);

            this._lastAttachedPosition = position;
        }
    }
}