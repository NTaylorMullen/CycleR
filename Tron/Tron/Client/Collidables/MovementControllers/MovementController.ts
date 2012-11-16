/// <reference path="../../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../../Interfaces/Game/Game.d.ts" />
/// <reference path="../../GameCore/GameTime.ts" />

class MovementController {
    public Velocity: IVector3 = new THREE.Vector3();

    constructor (private _context: IMesh, public Speed: number) {
    }

    public Update(gameTime: GameTime): void {        
    }
}