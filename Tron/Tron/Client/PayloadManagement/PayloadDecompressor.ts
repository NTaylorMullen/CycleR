/// <reference path="../Interfaces/Game/PayloadManagement/CompressionContracts.d.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

module PayloadDecompressor {
    var collidableContract: ICollidableCompressionContract,
        cycleContract: ICycleCompressionContract,
        payloadContract: IPayloadCompressionContract;

    function loadContracts (contracts: ICompressionContracts): void {
        collidableContract = contracts.CollidableCompressionContract;
        cycleContract = contracts.CycleCompressionContract;
        payloadContract = contracts.PayloadCompressionContract;
    }

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

    export function Initialize(connectionHub: IHubProxy): void {
        connectionHub.client.loadCompressionContracts = (contracts: ICompressionContracts) => {
            loadContracts(contracts);
        };
    }

    export function DecompressPayload(compressedPayload: any): IPayloadDecompressed {
        var decompressedPayload: IPayloadDecompressed = <IPayloadDecompressed>{},
            decompressedCycles: ICycleDecompressed[] = [];

        decompressedPayload.Cycles = compressedPayload[payloadContract.Cycles];

        for (var i: number = decompressedPayload.Cycles.length - 1; i >= 0; i--) {
            decompressedCycles.push(decompressCycle(<any>decompressedPayload.Cycles[i]));
        }

        decompressedPayload.Cycles = decompressedCycles;

        return decompressedPayload;
    }
}