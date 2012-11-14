var MapRenderer = (function () {
    function MapRenderer(_scene) {
        this._scene = _scene;
        this.RenderFloor();
    }
    MapRenderer.prototype.RenderFloor = function () {
        var planeTesselated = new THREE.PlaneGeometry(Map.MAP_SIZE.Width, Map.MAP_SIZE.Height, Map.FLOOR_TILE_SIZE.Width, Map.FLOOR_TILE_SIZE.Height);
        var matWire = new THREE.MeshBasicMaterial({
            color: 16777215,
            wireframe: true,
            wireframeLinewidth: 2
        });

        this._floor = new THREE.Mesh(planeTesselated, matWire);
        this._floor.rotation.x = -Math.PI / 2;
        this._scene.add(this._floor);
    };
    return MapRenderer;
})();
//@ sourceMappingURL=MapRenderer.js.map
