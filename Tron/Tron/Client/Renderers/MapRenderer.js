var MapRenderer = (function () {
    function MapRenderer(_scene) {
        this._scene = _scene;
        this.renderFloor();
        this.renderWalls();
    }
    MapRenderer.prototype.renderFloor = function () {
        var floorSizeIncrementor = new Size(Map.MAP_SIZE.Width / Map.FLOOR_TILE_SIZE.Width, Map.MAP_SIZE.Height / Map.FLOOR_TILE_SIZE.Height), planeTesselated = new THREE.PlaneGeometry(Map.MAP_SIZE.Width, Map.MAP_SIZE.Height, floorSizeIncrementor.Width, floorSizeIncrementor.Height), matWire = new THREE.MeshBasicMaterial({
color: 2414099,
wireframe: true,
wireframeLinewidth: 2        });
        this._floor = new THREE.Mesh(planeTesselated, matWire);
        this._floor.position = new THREE.Vector3(0, 0, 0);
        this._floor.rotation.x = -Math.PI / 2;
        this._scene.add(this._floor);
    };
    MapRenderer.prototype.renderWalls = function () {
        var wallGeometry = new THREE.PlaneGeometry(Map.WALL_SIZE.Width, Map.WALL_SIZE.Height), wallMaterial = new THREE.MeshBasicMaterial({
color: 3355443        }), wallLength = Map.MAP_SIZE.Width / 2, halfWallHeight = Map.WALL_SIZE.Height / 2, wallPositions = [
[
0, 
halfWallHeight, 
wallLength, 
Math.PI            ], 
[
0, 
halfWallHeight, 
-wallLength, 
0            ], 
[
wallLength, 
halfWallHeight, 
0, 
Math.PI * 1.5            ], 
[
-wallLength, 
halfWallHeight, 
0, 
Math.PI / 2            ]        ];
        this._walls = [];
        for(var i = 0; i < 4; i++) {
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position = new THREE.Vector3(wallPositions[i][0], wallPositions[i][1], wallPositions[i][2]);
            wall.rotation.y = wallPositions[i][3];
            this._walls.push(wall);
            this._scene.add(wall);
        }
    };
    return MapRenderer;
})();
//@ sourceMappingURL=MapRenderer.js.map
