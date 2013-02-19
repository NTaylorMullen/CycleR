interface IPerspectiveCamera extends ICamera {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    setLens(focalLength: number, frameSize: number): void;
    setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;
    updateProjectionMatrix(): void;
}