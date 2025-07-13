export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface OKLAB {
    l: number;
    a: number;
    b: number;
}

export type ColorSpace = RGBA | OKLAB;

export interface ImageData {
    info: {
        width: number;
        height: number;
        format: string;
    };
    color: ColorSpace[][];
}

export interface ColorTransform {
    id: string;
    imagePath: string;
    bin: number;
    palette: {
        before: string;
        after: string;
    }[];
}
