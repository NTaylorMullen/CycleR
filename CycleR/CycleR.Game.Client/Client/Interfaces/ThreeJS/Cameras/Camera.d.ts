interface ICamera extends IObject3D {
    matrixWorldInverse: any;
    projectionMatrix: any;
    projectionMatrixInverse: any;
    lookAt(vector: IVector3): void;
    target: IObject3D;
}