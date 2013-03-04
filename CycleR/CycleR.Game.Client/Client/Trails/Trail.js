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
        } else if(this.Direction === "z") {
            this.Context.scale.x = Trail.SIZE.Width;
        }
        this.Context.position = this._startPosition.clone();
        this.Context.position.y = Trail.SIZE.Height / 2;
        return this.Context;
    };
    Trail.prototype.ExtendTo = function (ownerPosition) {
        var positionDiff = this._startPosition[this.Direction] - ownerPosition[this.Direction], newSize = Math.abs(positionDiff);
        this.Context.scale[this.Direction] = newSize;
        this.Context.position[this.Direction] = ownerPosition[this.Direction] + .5 * newSize * positionDiff / Math.abs(positionDiff);
    };
    return Trail;
})();
//@ sourceMappingURL=Trail.js.map
