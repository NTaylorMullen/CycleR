var Collidable = (function () {
    function Collidable(id) {
        this.Disposed = false;
        this.ID = id;
        this.Alive = true;
        this.Collided = false;
        this.CollidedAt = new THREE.Vector3();
    }
    return Collidable;
})();
//@ sourceMappingURL=Collidable.js.map
