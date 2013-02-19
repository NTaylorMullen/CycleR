interface IColor {
    r: number;
    g: number;
    b: number;
    copy(color: IColor): IColor;
    copyGammaToLinear(color: IColor): IColor;
    copyLinearToGamma(color: IColor): IColor;
    convertGammaToLinear(): IColor;
    convertLinearToGamma(): IColor;
    setRGB(r: number, g: number, b: number): IColor;
    setHSV(h: number, s: number, v: number): IColor;
    setHex(hex: number): IColor;
    getHex(): number;
    getContextStyle(): string;
    clone(): IColor;
}