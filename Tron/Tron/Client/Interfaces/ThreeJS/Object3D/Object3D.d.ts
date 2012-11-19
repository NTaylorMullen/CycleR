interface IObject3D {
    id: number;
    name: string;
    parent: IObject3D;
    children: IObject3D[];
    position: IVector3;
    rotation: IVector3;
    eulerOrder: string;
    scale: IVector3;
    up: IVector3;
    material: IMaterial;

    add(object: IObject3D): void;
    remove(object: IObject3D): void;
    translate(distance: number, axis: string): void;
    translateX(distance: number): void;
    translateY(distance: number): void;
    translateZ(distance: number): void;
}