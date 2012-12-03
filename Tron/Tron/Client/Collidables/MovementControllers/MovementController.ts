/// <reference path="../../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../../Interfaces/Game/Game.d.ts" />
/// <reference path="../../GameCore/GameTime.ts" />

class MovementController {
    constructor (private _context: IMesh, public Velocity: IVector3, public Speed: number) {
    }

    public Update(gameTime: GameTime): void {        
    }
}