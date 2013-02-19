var Collidable = (function () {
    function Collidable(id) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
        this.Colliding = false;
    }
    Collidable.prototype.HandleCollision = function (payload) {
        this.Colliding = true;
    };
    return Collidable;
})();
//@ sourceMappingURL=Collidable.js.map
