/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

class Camera {
    static DISTANCE: number = 1000;

    public Context: IPerspectiveCamera;

    constructor () {
        this.Context = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.Context.position.z = Camera.DISTANCE;
        this.Context.position.y = 200;
    }
}