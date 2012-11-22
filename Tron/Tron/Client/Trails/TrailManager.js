var Size = (function () {
    function Size(width, height) {
        this.Width = width;
        if(height) {
            this.Height = height;
        } else {
            this.Height = width;
        }
    }
    Size.prototype.Half = function () {
        return new Size(0.5 * this.Width, 0.5 * this.Height);
    };
    return Size;
})();
var Trail = (function () {
    function Trail(Direction, _startPosition, _color, OwnerID) {
        this.Direction = Direction;
        this._startPosition = _startPosition;
        this._color = _color;
        this.OwnerID = OwnerID;
        this._startPosition = this._startPosition.clone();
    }
    Trail.SIZE = new Size(20, 100);
    Trail.prototype.CreateContext = function () {
        this.Context = new THREE.Mesh(new THREE.CubeGeometry(1, Trail.SIZE.Height, 1), new THREE.MeshBasicMaterial({
            color: this._color
        }));
        if(this.Direction === "x") {
            this.Context.scale.z = Trail.SIZE.Width;
        } else {
            if(this.Direction === "z") {
                this.Context.scale.x = Trail.SIZE.Width;
            }
        }
        this.Context.position = this._startPosition.clone();
        this.Context.position.y = Trail.SIZE.Height / 2;
        return this.Context;
    };
    Trail.prototype.ExtendTo = function (ownerPosition) {
        var positionDiff = this._startPosition[this.Direction] - ownerPosition[this.Direction], newSize = Math.abs(positionDiff);
        this.Context.scale[this.Direction] = newSize;
        this.Context.position[this.Direction] = ownerPosition[this.Direction] + 0.5 * newSize * positionDiff / Math.abs(positionDiff);
    };
    return Trail;
})();
var TrailManager = (function () {
    function TrailManager(_trailColor, _owner) {
        this._trailColor = _trailColor;
        this._owner = _owner;
        this._trailArchive = [];
        this._pendingContexts = [];
        this.StartTrail(this._owner.MovementController.Velocity, this._owner.Context.position);
    }
    TrailManager.prototype.StartTrail = function (currentVelocity, startPosition) {
        if(this.CurrentTrail != null) {
            var startPositionOffset = startPosition.clone();
            this.CurrentTrail.ExtendTo(startPositionOffset);
            this.LastTrail = this.CurrentTrail;
        }
        var direction;
        if(currentVelocity.x !== 0) {
            direction = "x";
        } else {
            if(currentVelocity.z !== 0) {
                direction = "z";
            }
        }
        this.CurrentTrail = new Trail(direction, startPosition, this._trailColor, this._owner.ID);
        this._trailArchive.push(this.CurrentTrail);
        this._pendingContexts.push(this.CurrentTrail.CreateContext());
    };
    TrailManager.prototype.PullPendingContexts = function () {
        if(this._pendingContexts.length > 0) {
            var pendingContexts = this._pendingContexts;
            this._pendingContexts = [];
            return pendingContexts;
        } else {
            return [];
        }
    };
    TrailManager.prototype.Update = function (gameTime) {
        if(this.CurrentTrail) {
            this.CurrentTrail.ExtendTo(this._owner.Context.position);
        }
    };
    return TrailManager;
})();
