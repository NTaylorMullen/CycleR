/// <reference path="Resources/CycleMovementController.js" />
/// <reference path="Resources/MapLocation.js" />

QUnit.module("Cycle Movement Facts");

new Map();

testUtilities.theory(
    [
        [new THREE.Vector3(1, 50, 20), new THREE.Vector3(0, 0, 1), new MapLocation(0,0), new THREE.Vector3(1, 50, 0), new THREE.Vector3(0, Math.PI, 0)],
        [new THREE.Vector3(1, 50, 20), new THREE.Vector3(0, 0, 0), new MapLocation(100, 100), new THREE.Vector3(0, 50, 0), new THREE.Vector3(0, Math.PI, 0)],
        [new THREE.Vector3(1, 50, -20), new THREE.Vector3(0, 0, -1), new MapLocation(0, 0), new THREE.Vector3(1, 50, 0), new THREE.Vector3(0, 0, 0)],
        [new THREE.Vector3(1, 50, -20), new THREE.Vector3(0, 0, 0), new MapLocation(100, 100), new THREE.Vector3(0, 50, 0), new THREE.Vector3(0, 0, 0)],
        [new THREE.Vector3(20, 50, 1), new THREE.Vector3(1, 0, 0), new MapLocation(0, 0), new THREE.Vector3(0, 50, 1), new THREE.Vector3(0, Math.PI * 1.5, 0)],
        [new THREE.Vector3(20, 50, 0), new THREE.Vector3(0, 0, 0), new MapLocation(100, 100), new THREE.Vector3(0, 50, 0), new THREE.Vector3(0, Math.PI * 1.5, 0)],
        [new THREE.Vector3(20, 50, 1), new THREE.Vector3(-1, 0, 0), new MapLocation(0, 0), new THREE.Vector3(50, 50, 1), new THREE.Vector3(0, Math.PI * .5, 0)],
        [new THREE.Vector3(20, 50, 1), new THREE.Vector3(0, 0, 0), new MapLocation(100, 100), new THREE.Vector3(0, 50, 0), new THREE.Vector3(0, Math.PI * .5, 0)]
    ],
    function (position, velocity, headLocation, expectedPosition, rotation) {
        QUnit.test("GetLinePosition Repositions correctly.", function () {
            var context = {
                rotation: rotation,
                position: position
            };
            var movementController = new CycleMovementController(context, velocity);
            movementController.HeadLocation = headLocation;

            QUnit.ok(movementController.GetLinePosition(movementController.Context.position).SameAs(expectedPosition));
        });
    });