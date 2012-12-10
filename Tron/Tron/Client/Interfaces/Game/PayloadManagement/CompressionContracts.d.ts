/// <reference path="Contracts/CollidableCompressionContract.d.ts" />
/// <reference path="Contracts/CycleCompressionContract.d.ts" />
/// <reference path="Contracts/MovementCompressionContract.d.ts" />
/// <reference path="Contracts/InitializationCompressionContract.d.ts" />
/// <reference path="Contracts/DeathCompressionContract.d.ts" />
/// <reference path="Contracts/CollisionCompressionContract.d.ts" />

interface ICompressionContracts {
    CollidableCompressionContract: ICollidableCompressionContract;
    CycleCompressionContract: ICycleCompressionContract;
    InitializationCompressionContract: IInitializationCompressionContract;
    MovementCompressionContract: IMovementCompressionContract;
    DeathCompressionContract: IDeathCompressionContract;
    CollisionCompressionContract: ICollisionCompressionContract;
}