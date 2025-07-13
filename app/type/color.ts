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
    alpha: number;
}

export type ColorSpace = RGBA | OKLAB;

// loadした画像のデータ
export interface ImageData {
    info: {
        width: number;
        height: number;
        format: string;
    };
    color: ColorSpace[][];
}
