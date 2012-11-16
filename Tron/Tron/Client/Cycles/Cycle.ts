/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

class Cycle {
    static BASE_CYCLE_SCALE: IVector3 = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    static SCALE: IVector3 = new THREE.Vector3(37, 40, 35);
    static SIZE: IVector3 = (new THREE.Vector3()).multiply(Cycle.BASE_CYCLE_SCALE, Cycle.SCALE);

    public Context: IMesh;

    constructor (startPosition: IVector3 ,rawModel: IGeometry) {
        this.Context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        this.Context.position = startPosition;
        this.Context.scale = Cycle.SCALE;
    }
}