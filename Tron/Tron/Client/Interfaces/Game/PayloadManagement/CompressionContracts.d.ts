/// <reference path="Contracts/CollidableCompressionContract.d.ts" />
/// <reference path="Contracts/CycleCompressionContract.d.ts" />
/// <reference path="Contracts/PayloadCompressionContract.d.ts" />

interface ICompressionContracts {
    CollidableCompressionContract: ICollidableCompressionContract;
    CycleCompressionContract: ICycleCompressionContract;
    PayloadCompressionContract: IPayloadCompressionContract;
}