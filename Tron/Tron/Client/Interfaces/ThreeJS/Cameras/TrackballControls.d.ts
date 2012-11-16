interface ITrackballControls extends EventTarget {
    object: IObject3D;
    domElement: HTMLCanvasElement;
    enabled: bool;
    screen: any;
    radius: number;
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noRotate: bool;
    noZoom: bool;
    noPan: bool;
    staticMoving: bool;
    dynamicDampingFactor: number;
    minDistance: number;
    maxDistance: number;
    keys: number[];
    target: IVector3;
    update(): void;
}