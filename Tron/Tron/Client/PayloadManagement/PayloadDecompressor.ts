/// <reference path="../Interfaces/Game/PayloadManagement/CompressionContracts.d.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

module PayloadDecompressor {
    var collidableContract: ICollidableCompressionContract,
        cycleContract: ICycleCompressionContract,
        initializationPayloadContract: IInitializationPayloadCompressionContract,
        movementPayloadContract: IMovementPayloadCompressionContract;

    function decompressCollidable(compressedCollidable: any[]): ICollidableDecompressed {
        return <ICollidableDecompressed>{
            ID: compressedCollidable[collidableContract.ID],
            Alive: !!compressedCollidable[collidableContract.Alive],
            Collided: !!compressedCollidable[collidableContract.Collided],
            CollidedAt: new THREE.Vector3(compressedCollidable[collidableContract.CollidedAt_X], compressedCollidable[collidableContract.CollidedAt_Y], compressedCollidable[collidableContract.CollidedAt_Z]),
            Position: new THREE.Vector3(compressedCollidable[collidableContract.Position_X], compressedCollidable[collidableContract.Position_Y], compressedCollidable[collidableContract.Position_Z]),
            Velocity: new THREE.Vector3(compressedCollidable[collidableContract.Velocity_X], compressedCollidable[collidableContract.Velocity_Y], compressedCollidable[collidableContract.Velocity_Z]),
            Rotation: compressedCollidable[collidableContract.Rotation]
        };
    }

    function decompressCycle(compressedCycle: any[]): ICycleDecompressed {
        var decompressedCycle: ICycleDecompressed = <ICycleDecompressed>decompressCollidable(compressedCycle);

        decompressedCycle.TrailColor = compressedCycle[cycleContract.TrailColor];

        return decompressedCycle;
    }

    export function LoadContracts(contracts: ICompressionContracts): void {
        collidableContract = contracts.CollidableCompressionContract;
        cycleContract = contracts.CycleCompressionContract;
        initializationPayloadContract = contracts.InitializationPayloadCompressionContract;
        movementPayloadContract = contracts.MovementPayloadCompressionContract;
    }

    export function DecompressMovementPayload(compressedPayload: any): IMovementPayloadDecompressed {
        var decompressedPayload: IMovementPayloadDecompressed = <IMovementPayloadDecompressed>{};

        decompressedPayload.ID = compressedPayload[movementPayloadContract.ID];
        decompressedPayload.Direction = compressedPayload[movementPayloadContract.Direction];
        decompressedPayload.Position = new THREE.Vector3(compressedPayload[movementPayloadContract.Position_X], compressedPayload[movementPayloadContract.Position_Y], compressedPayload[movementPayloadContract.Position_Z]);

        return decompressedPayload;
    }

    export function DecompressInitializationPayload(compressedPayload: any): IInitializationPayloadDecompressed {
        var decompressedPayload: IInitializationPayloadDecompressed = <IInitializationPayloadDecompressed>{},
        decompressedCycles: ICycleDecompressed[] = [];

        decompressedPayload.Cycles = compressedPayload[initializationPayloadContract.Cycles];

        for (var i: number = decompressedPayload.Cycles.length - 1; i >= 0; i--) {
            decompressedCycles.push(decompressCycle(<any>decompressedPayload.Cycles[i]));
        }

        decompressedPayload.Cycles = decompressedCycles;

        return decompressedPayload;
    }
}