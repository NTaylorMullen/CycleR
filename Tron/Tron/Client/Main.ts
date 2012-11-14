/// <reference path="Game/Game.ts" />

$(function () {
    var game = new Game();
});
    /*
    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    			scene.fog = new THREE.FogExp2( 0xffffff, 0.0003 );
				scene.fog.color.setHSV( 0.1, 0.10, 1 );

				light = new THREE.DirectionalLight( 0xffffff, 1.5 );
				light.position.set( 0, 1, 1 ).normalize();
				scene.add( light );

				var planeTesselated = new THREE.PlaneGeometry( 300, 300, 25, 25 );
				var matWire = new THREE.MeshBasicMaterial( { color :0xFFFFFF, wireframe: true, wireframeLinewidth: 2 } );

				floor = new THREE.Mesh( planeTesselated, matWire );
				floor.rotation.x = - Math.PI / 2;
				floor.scale.set( 25, 25, 25 );
				scene.add( floor );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {
    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    mesh.position.x += 5 * directionX;
    mesh.position.y += 5 * directionY;
    mesh.position.z += 5 * directionZ;

    camera.position.x += 5 * cameraX;
    camera.position.y += 5 * cameraY;
    camera.position.z += 5 * cameraZ;

    renderer.render(scene, camera);
}
    */