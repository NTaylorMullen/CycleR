/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Utilities/Size.ts" />

class Trail {
    static SIZE: Size = new Size(20, 100);

    public Context: IMesh;

    constructor (public Direction: string, private _startPosition: IVector3, private _color: number, public OwnerID: number) {
        this._startPosition = this._startPosition.clone();
    }

    public CreateContext(): IMesh {
        this.Context = new THREE.Mesh(new THREE.CubeGeometry(1, Trail.SIZE.Height, 1), new THREE.MeshBasicMaterial({ color: this._color }));

        if (this.Direction === "x") {
            this.Context.scale.z = Trail.SIZE.Width;
        }
        else if (this.Direction === "z") {
            this.Context.scale.x = Trail.SIZE.Width;
        }        

        this.Context.position = this._startPosition.clone();
        this.Context.position.y = Trail.SIZE.Height / 2;

        return this.Context;
    }

    public ExtendTo(ownerPosition: IVector3): void {
        var positionDiff: number = this._startPosition[this.Direction] - ownerPosition[this.Direction],
            newSize: number = Math.abs(positionDiff);
        this.Context.scale[this.Direction] = newSize;
        this.Context.position[this.Direction] = ownerPosition[this.Direction] + .5 * newSize * positionDiff / Math.abs(positionDiff);
    }
}