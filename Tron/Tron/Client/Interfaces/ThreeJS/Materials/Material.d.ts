interface IMaterial {
    id: number;
    name: string;
    opacity: number;
    transparent: bool;
    blending: any;
    blendSrc: number;
    blendDst: number;
    blendEquation: number;
    depthTest: bool;
    depthWrite: bool;
    polygonOffset: bool;
    polygonOffsetFactor: number;
    polygonOffsetUnits: number;
    alphaTest: number;
    overdraw: bool;
    visible: bool;
    side: any;
    needsUpdate: bool;
}