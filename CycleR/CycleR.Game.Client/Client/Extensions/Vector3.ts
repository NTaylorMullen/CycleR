/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

THREE.Vector3.prototype.singleValue = function () {
    if (this.x !== 0) {
        return this.x;
    }
    else if (this.y !== 0) {
        return this.y;
    }
    else if (this.z !== 0) {
        return this.z;
    }
    
    return 0;
}