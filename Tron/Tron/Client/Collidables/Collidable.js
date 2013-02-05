var Collidable = (function () {
    function Collidable(id) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
    }
    Collidable.prototype.HandleCollisionWith = function (obj) {
    };
    return Collidable;
})();
//@ sourceMappingURL=Collidable.js.map
