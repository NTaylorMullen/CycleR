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
