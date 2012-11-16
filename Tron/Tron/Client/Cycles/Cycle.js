var Cycle = (function () {
    function Cycle(startPosition, rawModel) {
        this.Context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        this.Context.position = startPosition;
        this.Context.scale = Cycle.SCALE;
    }
    Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    Cycle.SCALE = new THREE.Vector3(37, 40, 35);
    Cycle.SIZE = (new THREE.Vector3()).multiply(Cycle.BASE_CYCLE_SCALE, Cycle.SCALE);
    return Cycle;
})();
//@ sourceMappingURL=Cycle.js.map
