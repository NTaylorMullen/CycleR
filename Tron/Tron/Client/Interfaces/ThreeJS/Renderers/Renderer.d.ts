interface IRenderer {
    domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render(scene: IScene, camera: ICamera): void;
}