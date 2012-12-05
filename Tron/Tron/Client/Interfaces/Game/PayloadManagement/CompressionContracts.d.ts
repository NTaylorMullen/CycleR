/// <reference path="Contracts/CollidableCompressionContract.d.ts" />
/// <reference path="Contracts/CycleCompressionContract.d.ts" />
/// <reference path="Contracts/MovementPayloadCompressionContract.d.ts" />
/// <reference path="Contracts/InitializationPayloadCompressionContract.d.ts" />
/// <reference path="Contracts/DeathPayloadCompressionContract.d.ts" />

interface ICompressionContracts {
    CollidableCompressionContract: ICollidableCompressionContract;
    CycleCompressionContract: ICycleCompressionContract;
    InitializationPayloadCompressionContract: IInitializationPayloadCompressionContract;
    MovementPayloadCompressionContract: IMovementPayloadCompressionContract;
    DeathPayloadCompressionContract: IDeathPayloadCompressionContract;
}