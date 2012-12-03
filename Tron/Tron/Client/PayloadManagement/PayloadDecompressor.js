var PayloadDecompressor;
(function (PayloadDecompressor) {
    var collidableContract, cycleContract, payloadContract;
    function loadContracts(contracts) {
        collidableContract = contracts.CollidableCompressionContract;
        cycleContract = contracts.CycleCompressionContract;
        payloadContract = contracts.PayloadCompressionContract;
    }
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
    function Initialize(connectionHub) {
        connectionHub.client.loadCompressionContracts = function (contracts) {
            loadContracts(contracts);
        };
    }
    PayloadDecompressor.Initialize = Initialize;
    function DecompressPayload(compressedPayload) {
        var decompressedPayload = {
        }, decompressedCycles = [];
        decompressedPayload.Cycles = compressedPayload[payloadContract.Cycles];
        for(var i = decompressedPayload.Cycles.length - 1; i >= 0; i--) {
            decompressedCycles.push(decompressCycle(decompressedPayload.Cycles[i]));
        }
        decompressedPayload.Cycles = decompressedCycles;
        return decompressedPayload;
    }
    PayloadDecompressor.DecompressPayload = DecompressPayload;
})(PayloadDecompressor || (PayloadDecompressor = {}));
//@ sourceMappingURL=PayloadDecompressor.js.map
