var PayloadDecompressor;
(function (PayloadDecompressor) {
    var collidableContract, cycleContract, initializationPayloadContract, movementPayloadContract;
    function decompressCollidable(compressedCollidable) {
        return {
            ID: compressedCollidable[collidableContract.ID],
            Alive: !!compressedCollidable[collidableContract.Alive],
            Collided: !!compressedCollidable[collidableContract.Collided],
            CollidedAt: new THREE.Vector3(compressedCollidable[collidableContract.CollidedAt_X], compressedCollidable[collidableContract.CollidedAt_Y], compressedCollidable[collidableContract.CollidedAt_Z]),
            Position: new THREE.Vector3(compressedCollidable[collidableContract.Position_X], compressedCollidable[collidableContract.Position_Y], compressedCollidable[collidableContract.Position_Z]),
            Velocity: new THREE.Vector3(compressedCollidable[collidableContract.Velocity_X], compressedCollidable[collidableContract.Velocity_Y], compressedCollidable[collidableContract.Velocity_Z]),
            Rotation: compressedCollidable[collidableContract.Rotation]
        };
    }
    function decompressCycle(compressedCycle) {
        var decompressedCycle = decompressCollidable(compressedCycle);
        decompressedCycle.TrailColor = compressedCycle[cycleContract.TrailColor];
        return decompressedCycle;
    }
    function LoadContracts(contracts) {
        collidableContract = contracts.CollidableCompressionContract;
        cycleContract = contracts.CycleCompressionContract;
        initializationPayloadContract = contracts.InitializationPayloadCompressionContract;
        movementPayloadContract = contracts.MovementPayloadCompressionContract;
    }
    PayloadDecompressor.LoadContracts = LoadContracts;
    function DecompressMovementPayload(compressedPayload) {
        var decompressedPayload = {
        };
        decompressedPayload.ID = compressedPayload[movementPayloadContract.ID];
        decompressedPayload.Direction = compressedPayload[movementPayloadContract.Direction];
        decompressedPayload.Position = new THREE.Vector3(compressedPayload[movementPayloadContract.Position_X], compressedPayload[movementPayloadContract.Position_Y], compressedPayload[movementPayloadContract.Position_Z]);
        return decompressedPayload;
    }
    PayloadDecompressor.DecompressMovementPayload = DecompressMovementPayload;
    function DecompressInitializationPayload(compressedPayload) {
        var decompressedPayload = {
        }, decompressedCycles = [];
        decompressedPayload.Cycles = compressedPayload[initializationPayloadContract.Cycles];
        for(var i = decompressedPayload.Cycles.length - 1; i >= 0; i--) {
            decompressedCycles.push(decompressCycle(decompressedPayload.Cycles[i]));
        }
        decompressedPayload.Cycles = decompressedCycles;
        return decompressedPayload;
    }
    PayloadDecompressor.DecompressInitializationPayload = DecompressInitializationPayload;
})(PayloadDecompressor || (PayloadDecompressor = {}));
//@ sourceMappingURL=PayloadDecompressor.js.map
