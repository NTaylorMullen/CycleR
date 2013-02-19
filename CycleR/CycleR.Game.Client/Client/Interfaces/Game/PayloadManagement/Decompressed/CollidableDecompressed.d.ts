/// <reference path="../../../ThreeJS/Core/Vector3.d.ts" />

interface ICollidableDecompressed {
    ID: number;
    Alive: bool;
    Position: IVector3;    
    Velocity: IVector3;
    Rotation: number;
}