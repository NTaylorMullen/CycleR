/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Space/Map.ts" />

class MapRenderer {
    private _floor: IMesh;

    constructor (private _scene: IScene) {
        this.RenderFloor();
    }

    private RenderFloor(): void {
        var planeTesselated = new THREE.PlaneGeometry( Map.MAP_SIZE.Width, Map.MAP_SIZE.Height, Map.FLOOR_TILE_SIZE.Width, Map.FLOOR_TILE_SIZE.Height ),
		    matWire = new THREE.MeshBasicMaterial( { color :0xFFFFFF, wireframe: true, wireframeLinewidth: 2 } );

		this._floor = new THREE.Mesh( planeTesselated, matWire );
        this._floor.rotation.x = -Math.PI / 2;
		this._scene.add(this._floor);
    }
}