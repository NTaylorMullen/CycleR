var Camera = (function () {
    function Camera() {
        this.Context = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.Context.position.z = Camera.DISTANCE;
        this.Context.position.y = 200;
    }
    Camera.DISTANCE = 1000;
    return Camera;
})();
//@ sourceMappingURL=Camera.js.map
