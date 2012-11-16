/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

class EnvironmentRenderer {
    private _light: ILight;

    constructor (private _scene: IScene) {
        this.RenderFog();
        this.RenderLight();
    }

    private RenderFog(): void {
        this._scene.fog = new THREE.FogExp2(0x333333, 0.0003);
        this._scene.fog.color.setHSV( 0.1, 0.10, 1 );
    }

    private RenderLight(): void {
        this._light = new THREE.DirectionalLight(0xffffff, 1.5);
		this._light.position.set( 0, 1, 1 ).normalize();
		this._scene.add(this._light);
    }
}